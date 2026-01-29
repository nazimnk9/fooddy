import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
    title: "Dawat - Restaurant & Grill",
    description: "Order food delivery from Dawat - Restaurant & Grill",
};

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Providers>
                    <CartProvider>
                        <Header />
                        <main className="flex-1 mt-[80px]">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </Providers>
            </body>
        </html>
    );
}
