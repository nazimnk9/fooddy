import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
    title: "Dawat - Restaurant & Grill",
    description: "Order food delivery from Dawat - Restaurant & Grill",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </Providers>
            </body>
        </html>
    );
}
