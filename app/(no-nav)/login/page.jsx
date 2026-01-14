import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginPage() {

  const session = await auth()
  if (session) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-6">
        <p className="text-center text-lg">
          صباح الفل يسطا انت مسجل الدخول اصلا
        </p>
        <Link href={'/'} >
          <Button>
            ارجع للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    )
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
