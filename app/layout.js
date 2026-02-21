import { Cairo } from "next/font/google";
import "@/app/globals.css";
import TikTokPixel from "./TiktokPixel";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./Providers";

const arabicFont = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});


export const metadata = {
  title: "EG MEN",
  description: "Selling all Egyptian men essentials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className="dark" dir="rtl">
      <body
        className={`${arabicFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
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
