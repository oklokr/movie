import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  { path: "/admin", userTpcd: ["2"] }, // 관리자만
  { path: "/mypage", userTpcd: ["1", "2"] }, // 일반 + 관리자
];

function parseJwt(token: string | undefined) {
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  } catch (e) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const routeDef = protectedRoutes.find((r) => pathname.startsWith(r.path));
  if (!routeDef) return NextResponse.next();

  const token = req.cookies.get("jwtToken")?.value;

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  const payload = parseJwt(token);
  const userTpcd = payload?.role;

  if (!userTpcd || !routeDef?.userTpcd.includes(userTpcd)) {
    const noAuthUrl = req.nextUrl.clone();
    noAuthUrl.pathname = "/401";
    return NextResponse.redirect(noAuthUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // /app/admin/xxxx 경로 매칭
    "/admin", // /app/admin 루트 매칭
    "/mypage/:path*",
    "/mypage",
  ],
};
