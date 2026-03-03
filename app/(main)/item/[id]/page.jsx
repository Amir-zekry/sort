import { Suspense } from 'react'
import CustomerReviews from '@/features/singleItem/components/CustomerReviews'
import CustomerReviewsSkeleton from '@/features/singleItem/skeletons/CustomerReviewsSkeleton'
import { getItemById, getAllItems } from '@/features/singleItem/server/data'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { HandCoins, ScrollText, ShieldCheck } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import BuyNow from '@/features/singleItem/components/BuyNow'
import AddToCart from '@/features/cart/components/AddToCart'
import BuyNowSkeleton from '@/features/singleItem/skeletons/BuyNowSkeleton'
import { Skeleton } from '@/components/ui/skeleton'



export async function generateStaticParams() {
    const items = await getAllItems()
    return items.map((item) => ({ id: item.id }))
}


async function Page({ params }) {
    const { id } = await params
    const item = await getItemById(id)
    return (
        <div className='space-y-2 pb-2'>
            {/* hero section */}
            <section
                className="relative w-full h-screen flex md:items-center items-start px-8 md:px-24 py-24">

                {/* --- Background for Desktop --- */}
                {item.heroImage && (
                    <div
                        className="hidden md:block absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.heroImage})` }}
                    />
                )}

                {/* --- Background for Mobile --- */}
                {item.heroImagePhone && (
                    <div
                        className="md:hidden absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.heroImagePhone})` }}
                    />
                )}

                {/* --- Dark overlay for contrast --- */}

                {/* --- Content --- */}
                <div className="z-10 max-w-xl space-y-4 mix-blend-difference">
                    <h1 className="text-3xl md:text-5xl font-bold md:text-right text-center">
                        {item.name}
                    </h1>

                    <p className="text-sm md:text-lg opacity-90 md:text-right text-center">
                        {item.discription}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                        <Link href="#features">
                            <Button className={'w-full'}>
                                اعرف اكتر
                            </Button>
                        </Link>
                        <Suspense fallback={<Skeleton />}>
                            <BuyNow id={id} />
                        </Suspense>
                        <Suspense fallback={<Skeleton />}>
                            <AddToCart id={id} />
                        </Suspense>
                    </div>
                </div>
            </section>
            {/*features section */}
            <h2 className="text-2xl md:text-3xl font-bold text-center py-8">مميزات المنتج</h2>
            <section className='flex flex-col gap-y-20'>
                {item.feature.map((feature, index) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                        }}
                        key={feature.image_url}
                        className="flex flex-col w-full items-center px-4 md:px-8 space-y-16"
                    >
                        <motion.h1
                            // initial={{ x: 100 }}
                            // whileInView={{ x: 0 }}
                            // transition={{
                            //     duration: 1
                            // }}
                            className="text-3xl md:text-5xl font-bold text-center"
                        >
                            {feature.h1}
                        </motion.h1>

                        {/* Description + Image */}
                        <div className="w-full overflow-hidden">
                            <div
                                className={`flex flex-col items-center justify-between w-full md:max-w-5xl mx-auto gap-8 ${index % 2 === 1 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Description first always on mobile */}
                                <motion.p
                                    initial={{ x: index % 2 === 1 ? -100 : 100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{
                                        duration: 1
                                    }}
                                    className="text-muted-foreground text-lg leading-relaxed md:text-right text-center order-1 max-w-md"
                                >
                                    {feature.p}
                                </motion.p>

                                {/* Image last on mobile */}
                                <motion.div
                                    initial={{ x: index % 2 === 1 ? 100 : -100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{
                                        duration: 1
                                    }}
                                >
                                    <Image
                                        src={feature.image_url}
                                        width={500}
                                        height={500}
                                        alt="feature image"
                                        className="rounded-2xl w-full md:w-auto"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>
            {/* image gallery section */}
            <h2 className="text-2xl md:text-3xl font-bold text-center py-8">معرض الصور</h2>
            <Carousel className="w-3/4 mx-auto" dir='ltr'>
                <CarouselContent>
                    {item.imageGallery.map((image) => (
                        <CarouselItem key={image.image_url} className='md:basis-1/3 basis-1/1'>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center relative">
                                        <Image src={image.image_url} alt="Item Image" fill className="object-contain" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
            {/* reviews section */}
            <h2 className="text-2xl md:text-3xl font-bold text-center py-8">آراء العملاء</h2>
            <CustomerReviews id={id} />
            {/* why us section */}
            <h2 className="text-2xl md:text-3xl font-bold text-center py-8">ليه احنا؟</h2>
            <section className="flex flex-col justify-center w-full md:w-1/2 mx-auto space-y-8 px-4">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center md:text-right text-2xl md:text-3xl text-nowrap">ضمان استرجاع واستبدال</p>
                    <ScrollText className="w-24 h-24 md:w-36 md:h-36" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center md:text-right text-2xl md:text-3xl">اقل سعر في السوق</p>
                    <HandCoins className="w-24 h-24 md:w-36 md:h-36" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center md:text-right text-2xl md:text-3xl">اعلي جوده</p>
                    <ShieldCheck className="w-24 h-24 md:w-36 md:h-36" />
                </div>
            </section>
            {/* faq section */}
            <h2 className="text-2xl md:text-3xl font-bold text-center py-8">الأسئلة الشائعة</h2>
            <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full md:w-3/4 mx-auto"
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
            {/*buy now section */}
            <section className='flex items-center justify-center'>
                <Suspense fallback={<BuyNowSkeleton />}>
                    <BuyNow id={id} />
                </Suspense>
            </section>
        </div>
    )
}

export default Page