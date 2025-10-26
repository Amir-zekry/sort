import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

function Faq() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-1/2 justify-center mx-auto"
            defaultValue="item-1"
        >
            <AccordionItem value="item-3">
                <AccordionTrigger>هل ممكن استرجع المنتج؟</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        ايوه, ممكن تسترجع المنتج خلال <span className="font-extrabold text-2xl">14 يوم</span> من تاريخ الاستلام
                    </p>
                    <p>
                        ٍSort سهلت خدمة ما بعد البيع من خلال تقديم طلب الاستبدال او الاسترجاع بالدخول على موقع جودة وملىء استمارة خدمة ما بعد البيع <Link href='https://www.jawdaonline.com/egy-request' target="_blank" className="text-purple-500">https://www.jawdaonline.com/egy-request</Link> كمان هتقدر تتابع حالة الطلب من نفس اللينك
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Faq