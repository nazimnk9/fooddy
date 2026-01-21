"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, AlertCircle, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Image imports
import pizzaMargherita from "@/assets/food/pizza-margherita.jpg";
import heroBg from "@/assets/hero-bg.jpg"; // Using a generic hero bg or falling back to one of the food images if not available.
// Since I don't know if hero-bg exists, I'll use the pizza image as background for now or just a dark placeholder.
// Actually, I can use the pizza image as a background since the reference image has a pizza-like background.

export default function CartPage() {
    const [quantity, setQuantity] = useState(2);
    const [couponCode, setCouponCode] = useState("");

    const price = 25.00;
    const subtotal = price * quantity;
    const shipping = 0; // Free shipping

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Hero Section */}
            <section
                className="hero-banner"
                style={{ backgroundImage: `url(${pizzaMargherita.src})` }}
            >
                <div className="hero-banner-overlay" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-6 tracking-wide">
                        CART
                    </h1>
                    <nav className="flex items-center justify-center gap-3 text-sm">
                        <Link href="/" className="breadcrumb-link uppercase tracking-wider">
                            Home
                        </Link>
                        <span className="text-white/50">|</span>
                        <Link href="/menu" className="breadcrumb-link uppercase tracking-wider">
                            Shop
                        </Link>
                        <span className="text-white/50">|</span>
                        <span className="breadcrumb-active uppercase tracking-wider">
                            Cart
                        </span>
                    </nav>
                </div>
            </section>

            <main className="flex-1 py-16">
                <div className="container-fooddy">
                    {/* Notification Bar */}
                    <div className="bg-muted/30 border-t-2 border-muted flex items-center gap-2 p-4 mb-8 text-sm text-muted-foreground">
                        <AlertCircle className="w-4 h-4" />
                        <span>"Ravioli with Spinach and Ricotta cheese" removed. <button className="text-primary hover:underline">Undo?</button></span>
                    </div>

                    {/* Cart Table */}
                    <div className="mb-12 overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-primary text-primary-foreground uppercase text-sm tracking-wider font-bold">
                                    <th className="py-4 px-6 text-left w-1/2">Product</th>
                                    <th className="py-4 px-6 text-center">Price</th>
                                    <th className="py-4 px-6 text-center">Quantity</th>
                                    <th className="py-4 px-6 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-muted/10">
                                <tr className="border-b border-border">
                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-6">
                                            <button className="text-muted-foreground hover:text-destructive transition-colors bg-white hover:bg-white p-1 rounded">
                                                <X className="w-4 h-4 bg-gray-600 text-white rounded-sm hover:bg-destructive" />
                                            </button>
                                            <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={pizzaMargherita}
                                                    alt="Pizza Margherita"
                                                    fill
                                                    className="object-fixed"
                                                />
                                            </div>
                                            <span className="font-semibold text-foreground">Pizza Margherita</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-center text-primary font-bold">
                                        ${price.toFixed(2)}
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        <div className="inline-flex items-center bg-white border border-border rounded-full px-4 h-10 w-24">
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-full text-center bg-transparent focus:outline-none font-semibold text-foreground text-sm"
                                                min="1"
                                            />
                                            <div className="flex flex-col gap-0.5 ml-1 border-l pl-2 border-muted">
                                                {/* Custom arrows could go here, relying on default input controls for now or simple styling */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-right text-primary font-bold">
                                        ${subtotal.toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-20 bg-muted/10 p-6 rounded-sm">
                        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                            <Input
                                placeholder="Coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="bg-white border-none h-12 rounded-full px-6 max-w-xs shadow-sm"
                            />
                            <Button className="h-12 px-8 rounded-full font-bold uppercase tracking-wide">
                                Apply Coupon
                            </Button>
                        </div>
                        <Button variant="secondary" className="h-12 px-8 rounded-full font-bold uppercase tracking-wide bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30">
                            Update Cart
                        </Button>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-md">
                            <h3 className="text-xl font-bold uppercase tracking-wider text-foreground mb-6">Cart Totals</h3>
                            <div className="bg-muted/10 rounded-sm overflow-hidden">
                                <div className="border-b border-border">
                                    <div className="grid grid-cols-2">
                                        <div className="bg-primary p-4 font-bold text-primary-foreground uppercase tracking-wider text-sm">
                                            Subtotal
                                        </div>
                                        <div className="p-4 bg-muted/30 text-primary font-bold text-lg">
                                            ${subtotal.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-border">
                                    <div className="grid grid-cols-2">
                                        <div className="bg-primary p-4 font-bold text-primary-foreground uppercase tracking-wider text-sm flex items-center h-full">
                                            Shipping
                                        </div>
                                        <div className="p-4 bg-muted/30 text-sm">
                                            <p className="font-bold text-primary mb-1">Free shipping</p>
                                            <p className="text-muted-foreground leading-snug">Shipping options will be updated during checkout.</p>
                                            <div className="mt-2 text-primary font-bold flex items-center gap-1 cursor-pointer hover:underline">
                                                Calculate shipping <Truck className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid grid-cols-2">
                                        <div className="bg-primary p-4 font-bold text-primary-foreground uppercase tracking-wider text-sm">
                                            Total
                                        </div>
                                        <div className="p-4 bg-muted/30 text-primary font-bold text-lg">
                                            ${subtotal.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full h-14 mt-6 rounded-full font-bold text-lg uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
