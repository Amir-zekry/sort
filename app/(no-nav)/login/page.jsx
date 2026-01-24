import { auth } from "@/features/authentications/utils/auth";
import { LoginForm } from "@/features/authentications/components/login-form"
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams
  const url = callbackUrl || '/'
  const session = await auth()
  if (session) {
    redirect('/')
  }
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
