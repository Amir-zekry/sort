'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function SignupForm({ className, ...props }) {
  const initialState = { pending: false, errors: {} }
  const [state, action, pending] = useActionState(signup, initialState)
  return (
    <form action={action} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">انشئ حسابك</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">الاسم</FieldLabel>
          <Input id="name" name='name' type="text" placeholder="امير محمد" />
        </Field>
        <Field>
          <FieldLabel htmlFor="phoneNumber">رقم الهاتف</FieldLabel>
          <Input id="phoneNumber" name='phoneNumber' type="tel" placeholder="01552333223" />
          <FieldError>{state.errors?.phoneNumber}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">كلمة السر</FieldLabel>
          <Input id="password" name='password' type="password" />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          <FieldError>{state.errors?.password}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmed-password">تاكيد كلمة السر</FieldLabel>
          <Input id="confirmed-password" name='confirmed-password' type="password" />
          <FieldDescription>اكد كلمة السر</FieldDescription>
          <FieldError>{state.errors?.confirmedPassword}</FieldError>
        </Field>
        <Field>
          <Button type="submit">انشاء الحساب</Button>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
