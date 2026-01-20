export { auth as middleware } from "@/features/authentications/utils/auth"

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};