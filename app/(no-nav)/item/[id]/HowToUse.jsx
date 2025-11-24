"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function HowToUse() {
    const steps = [
        {
            title: "الخطوة ١: افتح العلبة",
            description: "افتح العلبة بهدوء وطلّع المنتج من غير ما تشد أو تكسر أي حاجة.",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
            title: "الخطوة ٢: شغّل المنتج",
            description: "وصّل المنتج بالكهربا أو اشحنه لو بيشتغل بالبطارية، واستنى شوية لحد ما يشتغل.",
            video: "https://www.w3schools.com/html/movie.mp4",
        },
        {
            title: "الخطوة ٣: استخدمه بالطريقة الصح",
            description: "اتبع التعليمات اللي في الكُتيّب أو الفيديو ده عشان تطلع أحسن نتيجة.",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
    ]

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {steps.map((step, index) => (
                    <AccordionItem key={index} value={`step-${index}`}>
                        <AccordionTrigger>
                            <span className="font-medium">{step.title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Card className="mt-3">
                                <CardHeader>
                                    <CardTitle className="text-lg">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                                    <video
                                        src={step.video}
                                        controls
                                        className="w-full rounded-lg border"
                                    />
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
