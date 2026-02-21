import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "../components/Home/Navbar/ResponsiveNav";
import Footer from "../components/Home/Footer/Footer";
import { Analytics } from "@vercel/analytics/next"

const font = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OK Portfolio | Next.js",
  description: "Portfolio website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning wygasza drobne różnice SSR/CSR zanim i18n przełączy język po mount
    <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning className={`${font.className} antialiased bg-[#0d0d1f]`}>
    <ResponsiveNav />
    {children}
    <Footer />
  </body>
</html>

  );
}
