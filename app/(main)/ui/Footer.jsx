"use client"

import React from "react"
import { Separator } from "@/components/ui/separator"
import { FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-muted/40 border-t max-w-screen">
            <div className="py-10">
                <div className="grid md:grid-cols-3 gap-8 px-4 max-w-full">
                    {/* القسم الأول */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">عنّا</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            احنا بنقدم منتجات بجوده عاليه مجربينها بنفسنا .. وكل المنتجات معاها ضمان استرجاع واستبدال .. عشان تشتري وانت متطمن
                            <br /><span className="text-purple-500">كل مشكله, وليها منتج | Sort</span>
                        </p>
                    </div>

                    {/* القسم التاني */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">روابط سريعة</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary">المتجر</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">تواصل معانا</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <a href="tel:01552333223" className="hover:text-primary">
                                    01552333223
                                </a>
                            </li>
                            <div className="flex items-center space-x-4">
                                <li className="flex items-center gap-2">
                                    <Link href="https://wa.me/201552333223" target="_blank" className="flex items-center gap-2 hover:text-primary">
                                        <FaWhatsapp className="w-6 h-6" />
                                    </Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Link href="https://www.tiktok.com/@user7205073192759" target="_blank" className="flex items-center gap-2 hover:text-primary">
                                        <FaTiktok className="w-6 h-6" />
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
