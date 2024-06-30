"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserLogin } from "@/lib/user-login";

const loginSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    password: z.string(),
  })
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: "User Not Exists",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }

    const checkPassword = await bcrypt.compare(password, user.password || "");

    if (!checkPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password Wrong",
        path: ["password"],
        fatal: true,
      });
      return z.NEVER;
    }

    return true;
  });

export async function handleLogin(prevState: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });

    await UserLogin(user!.id);
  }
}
