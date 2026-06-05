import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

export const sessionCookieName = "editor_handal_user";
export const demoUserId = "user_demo_001";

export async function getSessionUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(sessionCookieName)?.value || demoUserId;
}

export function attachSession(response: NextResponse, userId: string) {
  response.cookies.set(sessionCookieName, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export function clearSession(response: NextResponse) {
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
