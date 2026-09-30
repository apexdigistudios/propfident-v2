import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const { pathname } = request.nextUrl;

  // 1. Redirect legacy routes
  if (pathname.startsWith("/userpane") || pathname.startsWith("/dashboard")) {
    const newPath = pathname
      .replace(/^\/userpane/, "/userDashboard")
      .replace(/^\/dashboard/, "/userDashboard");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // 2. Initialize Supabase SSR Server Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Retrieve user session securely
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Protect /userDashboard
  if (!user && pathname.startsWith("/userDashboard")) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/userDashboard/:path*", "/userpane/:path*", "/dashboard/:path*"],
};