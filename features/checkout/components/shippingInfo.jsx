
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShippingInfoSelector } from './shippingInfoSelector'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ShippingInfo({ shippingInfo }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>بيانات الشحن</CardTitle>
            </CardHeader>
            <CardContent>
                <ShippingInfoSelector shippingInfo={shippingInfo} />
            </CardContent>
            <CardFooter>
                <Link href={'/checkout/add'}>
                    <Button>
                        اضافة بيانات شحن جديده
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ShippingInfo