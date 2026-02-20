import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
export function ShippingInfoSelector({ shippingInfo }) {
    return (
        <ScrollArea className="h-96 w-full">
            <RadioGroup name="shippingInfoId" className="max-w-sm" dir='rtl'>
                {shippingInfo.map((info) => (
                    <FieldLabel htmlFor={info.id} key={info.id}>
                        <Field orientation="horizontal">
                            <FieldContent >
                                <FieldTitle>عنوان محفوظ</FieldTitle>
                                <p><span className='font-semibold'>الاسم:</span> {info.name}</p>
                                <p><span className='font-semibold'>رقم الهاتف:</span> {info.number}</p>
                                <p><span className='font-semibold'>العنوان:</span> {info.address}</p>
                                <p><span className='font-semibold'>المحافظة:</span> {info.governorate}</p>
                            </FieldContent>

                            <RadioGroupItem
                                value={info.id}
                                id={info.id}
                                name='shippingInfoId'
                            />
                        </Field>
                    </FieldLabel>
                ))}
            </RadioGroup>
        </ScrollArea>
    )
}
