import { Empty } from '@/components/ui/empty'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'

function Cart() {
    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingCart size={24} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        عربة التسوق
                    </SheetTitle>
                    <SheetDescription>
                        هنا يمكنك عرض المنتجات التي أضفتها إلى عربة التسوق الخاصة بك
                    </SheetDescription>
                </SheetHeader>
                {/* محتوى عربة التسوق سيذهب هنا */}
                <Empty>
                    هذه الخاصيه لا تعمل بعد.. ولا يمكنك شراء اكثر من منتج واحد الان
                </Empty>
            </SheetContent>
        </Sheet>
    )
}

export default Cart