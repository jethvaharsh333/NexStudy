// import { authMiddleware } from "@clerk/nextjs";
// import { auth } from "./auth"
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { nullable } from "zod";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// export default authMiddleware({
//   // debug: true
//   // publicRoutes: ["/"],
//   publicRoutes: ["/","/aboutus","/services","/contactus","/auth/login","/auth/register","/api/uploadthing", "/api/webhook"]
//   // debug: true
// });
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export default auth((req) => {
  // publicRoutes: ["/api/webhook"]
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // console.log("_MY_REQUEST_ : "+ nextUrl + " :: " + isApiAuthRoute + " :: " + isPublicRoute + " :: " + isAuthRoute);

  if(isApiAuthRoute){
    return;
  }

  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search){
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};