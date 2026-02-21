'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Categories() {
    const categories = [
        { label: 'الكل', value: 'all' },
        { label: 'عربيتك', value: 'car' },
        { label: 'دولابك', value: 'closet' },
        { label: 'رياضتك', value: 'sports' },
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
            <h2 className="text-muted-foreground mb-2 md:block hidden">الفئات</h2>

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

            {/* Desktop List */}
            <ul className="hidden md:flex flex-col gap-3 mt-4 text-sm">
                {categories.map((category) => {
                    const isActive = activeCategory === category.value

                    return (
                        <li
                            key={category.value}
                            onClick={() => handleCategoryChange(category.value)}
                            className={`
                                cursor-pointer
                                transition-colors
                                ${isActive
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
