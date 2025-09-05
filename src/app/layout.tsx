"use client";

import type { Metadata } from "next";
import { poppins, inter } from "@/styles/fonts";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import FirstNavbar from "@/components/layout/FirstNavbar";
import SecondNavbar from "@/components/layout/SecondNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { useEffect, useState } from "react";
import { LanguageProvider } from "@/components/ui/LanguageProvider";
import { CountryProvider } from "@/components/ui/CountryProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window?.innerWidth < 878);
    };

    checkMobile();
    window?.addEventListener("resize", checkMobile);

    return () => window?.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <CountryProvider>
          <LanguageProvider>
            <Toaster position="top-right" />
            {isMobile ? <MobileNavbar /> : <TopBar />}
            <div className="md:sticky top-0 z-50 bg-white">
              {/* <FirstNavbar /> */}
              {!isMobile ? <SecondNavbar /> : ""}
            </div>
            {children}
            <ScrollToTop />
            <Footer />
          </LanguageProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
