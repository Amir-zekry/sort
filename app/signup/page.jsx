import { SignupForm } from "@/features/authentications/components/signup-form"
import { auth } from "@/features/authentications/utils/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth()
  if (session) {
    redirect('/')
  }
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
}
