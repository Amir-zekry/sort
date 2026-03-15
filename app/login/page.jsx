import { LoginForm } from "@/features/authentications/components/login-form"
import { LoginSkeleton } from "@/features/authentications/skeletons/LoginSkeleton";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
