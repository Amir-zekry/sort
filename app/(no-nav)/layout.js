import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export default function NoNavLayout({ children }) {
    return (
        <html lang="en" className="dark" dir="rtl">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <main className="max-w-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}