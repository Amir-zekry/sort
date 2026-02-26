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
        <div className="w-full md:w-32">
            <RadioGroup
                value={activeCategory}
                onValueChange={(value) => handleCategoryChange(value)}
                className="max-w-sm hidden md:block space-y-1"
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

            {/* Mobile Select */}
            <select
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="
                    md:hidden
                    w-full
                    rounded-md
                    border
                    px-3
                    py-2
                    text-sm
                    bg-background
                "
            >
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Categories
