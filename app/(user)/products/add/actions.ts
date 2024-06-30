"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const uploadSchema = z.object({
  photo: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
});

export async function handleUpload(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    photo: formData.get("file"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };

  const result = uploadSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          photo: result.data.photo,
          price: result.data.price,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
    }
  }
}

export async function getUploadUrl() {
  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env
      .CLOUDFLARE_ACCOUNT_ID!}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN!}`,
      },
    }
  );

  return await result.json();
}
