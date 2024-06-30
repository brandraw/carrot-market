import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
  id?: number;
}

export function getSession() {
  return getIronSession<Session>(cookies(), {
    cookieName: "Good Cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
