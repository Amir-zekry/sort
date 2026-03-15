import { auth } from "./features/authentications/utils/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (req.auth) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/login", "/signup"],
};