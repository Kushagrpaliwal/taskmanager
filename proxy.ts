import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/signup",
    "/api/auth/login",
    "/api/auth/signup",
    "/api/auth/refresh",
];

const AUTH_REDIRECT_ROUTES = ["/", "/login", "/signup"];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    const redirectToRefresh = (redirectPath: string) => {
        const url = new URL("/api/auth/refresh", req.url);
        url.searchParams.set("redirect", redirectPath);
        return NextResponse.redirect(url);
    };

    const redirectToHome = () =>
        NextResponse.redirect(new URL("/", req.url));

    const redirectToDashboard = () =>
        NextResponse.redirect(new URL("/dashboard", req.url));

    if (PUBLIC_ROUTES.includes(pathname)) {
        if (AUTH_REDIRECT_ROUTES.includes(pathname)) {
            if (accessToken) {
                try {
                    jwt.verify(accessToken, JWT_SECRET);
                    return redirectToDashboard();
                } catch (err: any) {
                    if (err.name === "TokenExpiredError" && refreshToken) {
                        return redirectToRefresh("/dashboard");
                    }
                }
            }

            if (!accessToken && refreshToken) {
                return redirectToRefresh("/dashboard");
            }
        }

        return NextResponse.next();
    }

    if (!accessToken) {
        return redirectToHome();
    }

    try {
        jwt.verify(accessToken, JWT_SECRET);
        return NextResponse.next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError" && refreshToken) {
            return redirectToRefresh(pathname);
        }
        return redirectToHome();
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
