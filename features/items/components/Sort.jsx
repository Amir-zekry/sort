'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Sort() {
    const sortOptions = [
        { label: 'الاحدث', value: 'recent' },
        { label: 'الاقل سعرا', value: 'low price' },
        { label: 'الاعلي سعرا', value: 'high price' },
    ]
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeSortOption = searchParams.get('sort') || 'recent'

    function handleSortChange(sort) {
        const params = new URLSearchParams(searchParams.toString())
        if (sort === 'recent') {
            params.delete('sort')
        } else {
            params.set('sort', sort)
        }
        router.push(`${pathname}?${params.toString()}`)
    }
    return (
        <RadioGroup
            value={activeSortOption}
            onValueChange={(value) => handleSortChange(value)}
            className="w-full md:w-32 sticky top-5 max-w-sm hidden md:block space-y-1"
        >
            {sortOptions.map((option) => (
                <FieldLabel htmlFor={option.label} key={option.label}>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>{option.label}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={option.value} id={option.label} key={option.value} />
                    </Field>
                </FieldLabel>
            ))}
        </RadioGroup>
    )
}

export default Sort