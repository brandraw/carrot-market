"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserLogin } from "@/lib/user-login";

const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(15)
      .refine(async (username) => {
        const user = await db.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });

        return !Boolean(user);
      }, "Username Already Exist"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(async (email) => {
        const user = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });

        return !Boolean(user);
      }, "Email Already Exist"),
    password: z.string(),
    password_confirm: z.string(),
  })
  .refine(({ password, password_confirm }) => password === password_confirm, {
    message: "Password does not same",
    path: ["password_confirm"],
  });

export async function handleSignup(prevState: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  const result = await signupSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hash = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hash,
      },
      select: {
        id: true,
      },
    });

    await UserLogin(user.id);
  }
}
