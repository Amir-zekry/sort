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
            className="w-3/4 justify-center mx-auto"
            defaultValue="item-1"
        >
            <AccordionItem value="item-2">
                <AccordionTrigger>هل ممكن استرجع المنتج؟</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="text-right">
                        ايوه, ممكن تسترجع المنتج خلال <span className="font-extrabold text-2xl">14 يوم</span> من تاريخ الاستلام
                    </p>
                    <p className="text-right">
                        EG MEN سهلت خدمة ما بعد البيع من خلال تقديم طلب الاستبدال او الاسترجاع بالدخول على موقع جودة وملىء استمارة خدمة ما بعد البيع <Link href='https://www.jawdaonline.com/egy-request' target="_blank" className="text-purple-500">https://www.jawdaonline.com/egy-request</Link> كمان هتقدر تتابع حالة الطلب من نفس اللينك
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>امتي هستلم المنتج؟</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="text-right">
                        بعد اتمام الطلب بيتم التواصل معاك خلال 24 ساعه لتاكيد طلبك, بعدها بيتم تسليم المنتج خلال 2 الي 5 ايام عمل حسب محافظتك.
                    </p>
                    <div>
                        <h3 className="font-bold text-2xl">مواعيد التسليم حسب المحافظه</h3>
                        <p className="text-right flex flex-col">
                            <span>
                                <br className="" /> القاهره والجيزه والاسكندريه | خلال يومين عمل
                            </span>
                            <span>
                                <br /> محافظات الوجه البحري والقليوبيه | خلال 3 ايام عمل
                            </span>
                            <span>
                                <br /> محافظات الصعيد وسيناء ومطروح والبحر الاحمر | من يومين حتي 5 ايام عمل
                            </span>
                        </p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Faq