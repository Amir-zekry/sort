'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { Label } from '@/components/ui/label'

function CategoriesMobile() {
    const categories = [
        { label: 'الكل', value: 'all' },
        { label: 'عربيتك', value: 'car' },
        { label: 'دولابك', value: 'closet' },
        { label: 'رياضتك', value: 'sports' },
        { label: 'عنايتك الشخصيه', value: 'care' }
    ]

    const pathname = usePathname()
    if (pathname != '/') {
        return null
    }
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
        <Collapsible>
            <CollapsibleTrigger className='flex items-center justify-between w-full mb-2'>
                الفئات <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <RadioGroup
                    dir='rtl'
                    value={activeCategory}
                    onValueChange={(value) => handleCategoryChange(value)}
                >
                    {categories.map((category) => (
                        <div key={category.label} className="flex items-center gap-3">
                            <RadioGroupItem value={category.value} id={category.label} key={category.value} />
                            <Label htmlFor={category.label}>{category.label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CategoriesMobile
