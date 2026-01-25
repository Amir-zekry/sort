import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import TikTokPixel from "./TiktokPixel";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EG MEN",
  description: "Selling all Egyptian men essentials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <TikTokPixel />
        <Analytics />
        <SpeedInsights />
        <Toaster
          toastOptions={{
            className: 'z-[100]',
          }}
        />
      </body>
    </html>
  );
}
