'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "@/auth"
import Link from "next/link"
import { useActionState } from "react"
import { authenticate } from "@/app/actions"

export function LoginForm({ className, ...props }) {
  const initialState = {
    errors: {},
    pending: false,
    message: null,
    data: {}
  }
  const [state, action, pending] = useActionState(authenticate, initialState)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            action={action}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">اهلا بيك</h1>
                <p className="text-muted-foreground text-balance">
                  تسجيل الدخول الي حسابك
                </p>
              </div>
              <Field>
                <div className="w-full flex justify-between items-center">
                  <FieldLabel htmlFor="phoneNumber">رقم الهاتف</FieldLabel>
                  <FieldError>{state.errors?.phoneNumber}</FieldError>
                </div>
                <Input
                  id="phoneNumber"
                  type="tel"
                  dir='rtl'
                  name='phoneNumber'
                  defaultValue={state.data?.phoneNumber}
                  className={state.errors?.phoneNumber ? 'border-red-400' : ''}
                  placeholder="ادخل رقم مصري"
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
                  <FieldError>{state.errors?.password}</FieldError>
                  {/* <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  name='password'
                  className={state.errors?.password ? 'border-red-400' : ''}
                  placeholder="********"
                />
              </Field>
              <FieldError>{state.message}</FieldError>
              <Field>
                <Button
                  type="submit"
                  disabled={pending}
                >
                  تسجيل الدخول
                </Button>
              </Field>
              <FieldSeparator />
              <FieldDescription className="text-center">
                معندكش حساب؟ <Link href="/signup">انشاء حساب</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/logo.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
