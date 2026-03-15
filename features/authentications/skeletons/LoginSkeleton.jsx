import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Skeleton } from "@/components/ui/skeleton"

export function LoginSkeleton({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          {/* form side */}
          <div className="p-6 md:p-8">
            <FieldGroup>

              {/* title */}
              <div className="flex flex-col items-center gap-2 text-center">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>

              {/* phone field */}
              <Field>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
              </Field>

              {/* password field */}
              <Field>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
              </Field>

              {/* error area */}
              <Field className="min-h-5">
                <Skeleton className="h-4 w-40" />
              </Field>

              {/* button */}
              <Field>
                <Skeleton className="h-10 w-full rounded-md" />
              </Field>

              <FieldSeparator />

              {/* footer text */}
              <div className="flex justify-center">
                <Skeleton className="h-4 w-48" />
              </div>

            </FieldGroup>
          </div>

          {/* image side */}
          <div className="bg-muted relative hidden md:block">
            <Skeleton className="absolute inset-0" />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}