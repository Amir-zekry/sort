'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Categories() {
    const categories = [
        { label: 'الكل', value: 'all' },
        { label: 'عربيتك', value: 'car' },
        { label: 'دولابك', value: 'closet' },
        { label: 'رياضتك', value: 'sports' },
        { label: 'عنايتك الشخصيه', value: 'care' }
    ]

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeCategory = searchParams.get('category') || 'all'

    function handleCategoryChange(category) {
        const params = new URLSearchParams(searchParams.toString())

        if (category === 'all') {
            params.delete('category')
        } else {
            params.set('category', category)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <RadioGroup
            value={activeCategory}
            onValueChange={(value) => handleCategoryChange(value)}
            className="w-full md:w-32 sticky top-5 max-w-sm hidden md:block space-y-1"
        >
            {categories.map((category) => (
                <FieldLabel htmlFor={category.label} key={category.label}>
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>{category.label}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value={category.value} id={category.label} key={category.value} />
                    </Field>
                </FieldLabel>
            ))}

        </RadioGroup>
    )
}

export default Categories
