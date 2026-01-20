'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

function SearchBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const handelSearch = useDebouncedCallback((search) => {
        const params = new URLSearchParams(searchParams.toString())

        if (!search) {
            params.delete('search')
        } else {
            params.set('search', search)
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)

    // Called when user presses Enter / Go
    const submitSearch = () => {
        handelSearch(value)
        setOpen(false) // ✅ close sheet
    }

    return (
        <>
            {/* Desktop */}
            <div className="relative hidden md:block md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    type="text"
                    placeholder="ابحث عن منتج"
                    onChange={(e) => handelSearch(e.target.value)}
                    className="pl-10 h-11"
                />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                            <Search size={24} />
                    </SheetTrigger>

                    <SheetContent side="right" className="pt-10">
                        <SheetTitle />

                        <div className="relative mx-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

                            <Input
                                autoFocus
                                type="search"
                                placeholder="ابحث عن منتج"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        submitSearch()
                                    }
                                }}
                                className="pl-10 h-11"
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default SearchBar
