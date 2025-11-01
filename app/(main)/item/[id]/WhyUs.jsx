import { Truck, ScrollText, ShieldCheck } from "lucide-react"
function WhyUs() {
    return (
        <div className="flex flex-col justify-center w-full md:w-1/2 mx-auto space-y-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-right text-2xl md:text-3xl">توصيل مجاني</p>
                <Truck className="w-24 h-24 md:w-36 md:h-36" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-right text-2xl md:text-3xl text-nowrap">ضمان استرجاع واستبدال</p>
                <ScrollText className="w-24 h-24 md:w-36 md:h-36" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-right text-2xl md:text-3xl">اعلي جوده</p>
                <ShieldCheck className="w-24 h-24 md:w-36 md:h-36" />
            </div>
        </div>
    )
}

export default WhyUs