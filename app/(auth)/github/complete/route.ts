import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { UserLogin } from "@/lib/user-login";

async function getAccessToken(code: string) {
  const searchParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const result = await fetch(
    `https://github.com/login/oauth/access_token?${searchParams}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return await result.json();
}

async function getUser(accessToken: string) {
  const result = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await result.json();
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getAccessToken(code);
  if (error) {
    console.log(error);
    return new Response(null, {
      status: 400,
    });
  }

  const { login, id, avatar_url } = await getUser(access_token);

  const checkId = await db.user.findUnique({
    where: {
      github_id: id,
    },
    select: {
      id: true,
    },
  });
  if (checkId) {
    await UserLogin(checkId.id);
  }

  const checkUsername = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });
  if (!!checkUsername) {
    const user = await db.user.create({
      data: {
        username: login + crypto.randomBytes(3).toString("hex"),
        github_id: id,
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
    await UserLogin(user.id);
  } else {
    const user = await db.user.create({
      data: {
        username: login,
        github_id: id,
        avatar: avatar_url,
      },
    });
    await UserLogin(user.id);
  }
}
