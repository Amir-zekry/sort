import Redirect from "@/features/authentications/components/redirect";
import { SignupForm } from "@/features/authentications/components/signup-form"
import { Suspense } from "react";

export default async function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Suspense>
        <Redirect />
      </Suspense>
      <div className="w-full max-w-sm md:max-w-4xl">
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
