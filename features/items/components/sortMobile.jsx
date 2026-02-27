'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { Label } from '@/components/ui/label'

function SortMobile() {
    const sortOptions = [
        { label: 'الاحدث', value: 'recent' },
        { label: 'الاقل سعرا', value: 'low price' },
        { label: 'الاعلي سعرا', value: 'high price' },
    ]
    const pathname = usePathname()
    if (pathname != '/') {
        return null
    }
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
        <Collapsible>
            <CollapsibleTrigger className='flex items-center justify-between w-full mb-2'>
                ترتيب حسب <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <RadioGroup
                    dir='rtl'
                    value={activeSortOption}
                    onValueChange={(value) => handleSortChange(value)}
                >
                    {sortOptions.map((option) => (
                        <div key={option.label} className="flex items-center gap-3">
                            <RadioGroupItem value={option.value} id={option.label} key={option.value} />
                            <Label htmlFor={option.label}>{option.label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default SortMobile