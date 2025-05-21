"use server"

import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function middleware(req) {
    const cookieStore = await cookies();
    const userToken = cookieStore.get("userToken")?.value;
    // console.log(req);
    if (!userToken) {
        return NextResponse.redirect(new URL('/register', req.url));
    }
    // if (userToken) {
    //     if (userToken.role === 'admin') {
    //         return NextResponse.redirect(new URL('/admin', req.url));
    //     } else {
    //         return NextResponse.redirect(new URL('/', req.url));
    //     }
    // }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
    ],
};
