"use server";

import { z } from "zod";
import validator from "validator";
import { db } from "@/lib/db";
import crypto from "crypto";
import { UserLogin } from "@/lib/user-login";

const phoneSchema = z
  .string()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"));
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(async (token) => {
    const check = await db.smsToken.findUnique({
      where: {
        token: token + "",
      },
      select: {
        id: true,
      },
    });

    return Boolean(check);
  });

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();

  const check = await db.smsToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (check) {
    return getToken();
  } else {
    return token;
  }
}

interface prevStateProps {
  token: boolean;
  phone?: string;
}

export async function handleSms(prevState: prevStateProps, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const phoneData = formData.get("phone") as string | undefined;
  const tokenData = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phoneData);
    if (!result.success) {
      return {
        token: false,
        errors: result.error.flatten(),
      };
    } else {
      const token = await getToken();

      await db.smsToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      await db.smsToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });

      // send a sms token

      return {
        token: true,
        phone: phoneData,
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(tokenData);
    if (!result.success) {
      return {
        ...prevState,
        errors: result.error.flatten(),
      };
    } else {
      const token = await db.smsToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              phone: true,
            },
          },
        },
      });
      const phoneCheck = prevState.phone === token?.user.phone;
      if (phoneCheck) {
        await db.smsToken.delete({
          where: {
            token: result.data + "",
          },
        });
        await UserLogin(token!.user.id);
      }

      return {
        ...prevState,
        errors: {
          formErrors: ["Wrong Token"],
        },
      };
    }
  }
}
