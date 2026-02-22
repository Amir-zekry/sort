'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function Sort() {
    const sortOptions = [
        { label: 'الاحدث', value: 'recent' },
        { label: 'الاقل سعرا', value: 'low price' },
        { label: 'الاعلي سعرا', value: 'high price' },
    ]
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeSortOption = searchParams.get('sort')

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
        <div className="w-full md:w-32">
            <h2 className='text-muted-foreground hidden md:block'>ترتيب حسب</h2>
            
            {/* Mobile Select */}
            <select
                onChange={(e) => handleSortChange(e.target.value)}
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
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Desktop List */}
            <ul className="hidden md:flex flex-col gap-3 mt-4 text-sm">
                {sortOptions.map((option) => {
                    const isActive = activeSortOption === option.value

                    return (
                        <li
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`
                                cursor-pointer
                                transition-colors
                                ${isActive
                                    ? 'text-purple-800 font-semibold'
                                    : 'text-foreground hover:underline'
                                }
                            `}
                        >
                            {option.label}
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Sort