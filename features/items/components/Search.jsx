'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

function SearchBar() {
    const pathname = usePathname()
    if (pathname != '/') return
    const searchParams = useSearchParams()
    const router = useRouter()

    const handelSearch = useDebouncedCallback((search) => {
        const params = new URLSearchParams(searchParams.toString())

        if (!search) {
            params.delete('search')
        } else {
            params.set('search', search)
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)

    return (
        <div className="relative md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                type="text"
                placeholder="ابحث عن منتج"
                onChange={(e) => handelSearch(e.target.value)}
                className="pl-10 h-11"
            />
        </div>
    )
}

export default SearchBar
