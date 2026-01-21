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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { signup } from "@/features/authentications/server/actions";
import { useActionState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { CircleQuestionMark } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export function SignupForm({ className, ...props }) {
  const initialState = {}
  const [state, action, pending] = useActionState(signup, initialState)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/login"
  useEffect(() => {
    if (!pending) return

    let value = 20

    const toastId = toast.custom(
      () => (
        <Progress value={value} className="w-62" />
      ),
      { duration: Infinity }
    )

    const interval = setInterval(() => {
      value = Math.min(value + 15, 90)
      toast.custom(
        () => (
          <Progress value={value} className="w-62" />
        ),
        { id: toastId }
      )
    }, 500)

    return () => {
      clearInterval(interval)
      toast.dismiss(toastId)
    }
  }, [pending])





  useEffect(() => {
    if (state.success) {
      router.push(`/login?callbackUrl=${callbackUrl}`)
      toast.success("تم انشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن")
    }
  }, [state.success])




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">انشئ حسابك</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  ادخل بياناتك بالاسفل لانشاء حسابك
                </p>
              </div>
              <Field>
                <div className="w-full flex items-center justify-between">
                  <FieldLabel htmlFor="name">الاسم</FieldLabel>
                  <FieldError>{state.fieldErrors?.name}</FieldError>
                </div>
                <Input id="name" type="text" name='name' defaultValue={state.data?.name} placeholder="اكتب اسمك الجميل" />
              </Field>
              <Field>
                <div className="w-full flex items-center justify-between">
                  <FieldLabel htmlFor="phoneNumber">رقم الهاتف</FieldLabel>
                  <FieldError>{state.fieldErrors?.phoneNumber}</FieldError>
                  {state.hasAnAccountError?.phoneNumber && (
                    <div className="flex gap-x-2">
                      <FieldError>{state.hasAnAccountError?.phoneNumber}</FieldError>
                      <Link href={'/login'} className="underline text-purple-500 text-sm">تسجيل الدخول ؟</Link>
                    </div>
                  )}
                </div>
                <Input id="phoneNumber" type="tel" dir='rtl' name='phoneNumber' defaultValue={state.data?.phoneNumber} placeholder="ادخل رقم مصري" />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <div className="w-full flex items-center justify-between">
                      <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
                      {
                        state.fieldErrors?.password &&
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <FieldError>
                              <CircleQuestionMark size={16} className=" animate-caret-blink" />
                            </FieldError>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div className='space-y-2'>
                              {state.fieldErrors.password.map((error, index) => (
                                <FieldError key={index} className='text-red-500'>
                                  {error}
                                </FieldError>
                              ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      }
                    </div>
                    <Input id="password" type="password" name='password' placeholder='********' />
                  </Field>
                  <Field>
                    <div className="w-full flex items-center justify-between">
                      <FieldLabel htmlFor="confirm-password">تاكيد كلمة السر</FieldLabel>
                      <FieldError>{state.fieldErrors?.confirmedPassword}</FieldError>
                    </div>
                    <Input id="confirm-password" type="password" name='confirmed-password' placeholder='********' />
                  </Field>
                </Field>
              </Field>
              <Field>
                <div className="min-h-6 h-6 max-h-6">
                  <FieldError>{state.formErrors?.[0]}</FieldError>
                </div>
                <Button
                  type="submit"
                  disabled={pending}
                >
                  انشاء حساب
                </Button>
              </Field>
              <FieldSeparator />
              <FieldDescription className="text-center">
                عندك حساب؟ <Link href={`/login?callbackUrl=${callbackUrl}`}>تسجيل الدخول</Link>
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
