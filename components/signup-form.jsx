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
import { signup } from "@/app/actions";
import { useActionState } from "react"
import Link from "next/link"


export function SignupForm({ className, ...props }) {
  const initialState = {
    pending: false,
    fieldErrors: {},
    formErrors: [],
    data: {}
  }
  const [state, action, pending] = useActionState(signup, initialState)
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
                </div>
                <Input id="phoneNumber" type="tel" dir='rtl' name='phoneNumber' defaultValue={state.data?.phoneNumber} placeholder="ادخل رقم مصري" />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <div className="w-full flex items-center justify-between">
                      <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
                      <FieldError>{state.fieldErrors?.password}</FieldError>
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
                <FieldError>{state.formErrors[0]}</FieldError>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={pending}
                >
                  انشاء حساب
                </Button>
              </Field>
              <FieldSeparator />
              <FieldDescription className="text-center">
                عندك حساب؟ <Link href="/login">تسجيل الدخول</Link>
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
