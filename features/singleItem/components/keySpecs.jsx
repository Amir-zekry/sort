import { Separator } from '@/components/ui/separator'
import React from 'react'
import { RulerDimensionLine, Circle, Cable, BatteryCharging, BrickWall } from 'lucide-react'

function KeySpecs() {
    return (
        <div className='grid md:grid-cols-3 grid-cols-2 md:px-20 px-4 gap-y-8'>
            <div className='flex flex-col space-y-1 items-center'>
                <Circle size={36} fill='white' color='white' />
                <p className='text-muted-foreground'>اللون</p>
                <p className='text-lg'>ابيض</p>
            </div>
            <div className='flex flex-col space-y-1 items-center'>
                <RulerDimensionLine size={36} />
                <p className='text-muted-foreground'>الابعاد</p>
                <p className='text-lg'>4 × 12 × 12</p>
            </div>
            <Separator className='md:hidden block col-span-2 border-2' />
            <div className='flex flex-col space-y-1 items-center'>
                <BrickWall size={36} />
                <p className='text-muted-foreground'>الخامه</p>
                <p className='text-lg'>بلاستيك عالي الجودة</p>
            </div>
            <Separator className='md:col-span-3 md:block hidden border-2' />
            <div className='flex flex-col space-y-1 items-center'>
                <Cable size={36} />
                <p className='text-muted-foreground'>جهد الخرج</p>
                <p className='text-lg'>2.8 فولت</p>
            </div>
            <Separator className='md:hidden block col-span-2 border-2' />
            <div className='flex flex-col space-y-1 items-center'>
                <Cable size={36} />
                <p className='text-muted-foreground'>جهد الإدخال</p>
                <p className='text-lg'>220 فولت</p>
            </div>
            <div className='flex flex-col space-y-1 items-center'>
                <BatteryCharging size={36} />
                <p className='text-muted-foreground'>وقت الشحن</p>
                <p className='text-lg'>15 ساعة</p>
            </div>
            <Separator className='md:col-span-3 md:block hidden border-2' />
        </div>
    )
}

export default KeySpecs