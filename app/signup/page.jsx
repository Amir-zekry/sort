import { SignupForm } from "@/features/authentications/components/signup-form"
import { SignupSkeleton } from "@/features/authentications/skeletons/SignupSkeleton";
import { Suspense } from "react";

export default async function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Suspense fallback={<SignupSkeleton />}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
