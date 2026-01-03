import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {loginRateLimit, registerRateLimit} from "./lib/ratelimit";

const {auth} = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const {pathname} = req.nextUrl;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  // ratelimit

  if (!isLoggedIn) {
    if (pathname === "/login" && req.method === "POST") {
      const {success} = await loginRateLimit.limit(ip);
      if (!success)
        return new Response(
          JSON.stringify({
            error: "Too many login attempts. Please wait 2 hours.",
          }),
          {
            status: 429,
            headers: {"Content-Type": "application/json"},
          }
        );
    }

    if (pathname === "/signup" && req.method === "POST") {
      const {success} = await registerRateLimit.limit(ip);
      if (!success)
        return new Response(
          JSON.stringify({
            error: "Too many attempts. Wait 10 hours.",
          }),
          {
            status: 429,
            headers: {"Content-Type": "application/json"},
          }
        );
    }
  }

  // authpage
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn) {
    if (pathname === "/") {
      if (role === "ADMIN") {
        return Response.redirect(new URL("/dashboard-admin", req.nextUrl));
      }
    }

    if (isAuthPage) {
      const target = role === "ADMIN" ? "/dashboard-admin" : "/";
      return Response.redirect(new URL(target, req.nextUrl));
    }

    if (pathname.startsWith("/dashboard-admin") && role !== "ADMIN") {
      return Response.redirect(new URL("/", req.nextUrl));
    }

    if (pathname.startsWith("/dashboard-user") && role === "ADMIN") {
      return Response.redirect(new URL("/dashboard-admin", req.nextUrl));
    }
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
