import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Token still valid — let the request through
  if (accessToken) return NextResponse.next();

  // Access token expired, but refresh token exists — try to renew
  if (refreshToken) {
    const res = await fetch("https://your-api.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (res.ok) {
      const { accessToken: newAccess } = await res.json();
      const response = NextResponse.next();

      response.cookies.set("access_token", newAccess, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
      });

      return response;
    }
  }
}
