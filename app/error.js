'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'

export default function ErrorPage({ error, reset }) {

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center space-y-2'>
            <h2>{error.message}</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}