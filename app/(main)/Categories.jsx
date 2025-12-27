'use client'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Categories() {
    const categories = [
        { label: 'الكل', value: 'all' },
        { label: 'عربيتك', value: 'car' },
        { label: 'دولابك', value: 'closet' },
        {label: 'رياضتك', value: 'sports' },
    ]

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeCategory = searchParams.get('category') || 'all'

    function handleCategoryClick(category) {
        const params = new URLSearchParams(searchParams.toString())

        if (category === 'all') {
            params.delete('category')
        } else {
            params.set('category', category)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-32">
            <h2 className="text-muted-foreground">الفئات</h2>

            <ul className="flex flex-col gap-3 mt-4 text-sm">
                {categories.map((category) => {
                    const isActive = activeCategory === category.value

                    return (
                        <li
                            key={category.value}
                            onClick={() => handleCategoryClick(category.value)}
                            className={`
                                cursor-pointer
                                transition-colors
                                ${
                                    isActive
                                        ? 'text-purple-800 font-semibold'
                                        : 'text-foreground hover:underline'
                                }
                            `}
                        >
                            {category.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories
