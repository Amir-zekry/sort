import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FieldLabel, FieldContent, Field, FieldTitle } from "@/components/ui/field"

function PaymentMethod() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>طريقة الدفع</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="COD" className="max-w-sm" dir='rtl' required>
                    <FieldLabel htmlFor="COD">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>الدفع عند الاستلام</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="COD" id="COD" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>
            </CardContent>
        </Card>
    )
}

export default PaymentMethod