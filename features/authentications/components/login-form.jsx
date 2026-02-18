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
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { authenticate } from "@/features/authentications/server/actions"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"

export function LoginForm({ className, ...props }) {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get('phone') || ''
  const initialState = {
    data: {
      phoneNumber: phoneFromUrl,
    },
  }
  const callbackUrl = searchParams.get('callbackUrl')
  const url = callbackUrl || '/'
  const [state, action, pending] = useActionState(authenticate, initialState)

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message)
    } else if (state.success === false) {
      toast.error(state.message)
    }
  }, [state])
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
                  placeholder="ادخل رقم مصري"
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
                  <FieldError>{state.errors?.password}</FieldError>
                </div>
                <Input
                  id="password"
                  type="password"
                  name='password'
                  placeholder="********"
                />
              </Field>
              <Field className="min-h-5">
                <FieldError>{state.InvalidCredentials}</FieldError>
              </Field>
              <input value={url} name="callbackUrl" type="hidden" />
              <Field>
                <Button
                  className={`w-full ${pending ? 'cursor-progress disabled:pointer-events-auto' : ''}`}
                  disabled={pending}
                  type="submit"
                >
                  {pending ? <Loader className="animate-spin" /> : 'تسجيل الدخول'}
                </Button>
              </Field>
              <FieldSeparator />
              <FieldDescription className="text-center">
                معندكش حساب؟ <Link href={`/signup?callbackUrl=${url}`}>انشاء حساب</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/logo.png"
              alt="EG MEN logo"
              fill
              className="object-cover dark:brightness-[0.5] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
