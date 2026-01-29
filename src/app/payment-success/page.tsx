"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center py-48 px-4">
                <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                    {/* Success Icon */}
                    <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-primary/10 rounded-full">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping opacity-25" />
                        <CheckCircle2 className="w-20 h-20 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
                            Payment Successful!
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            Thank you for your order. We've received your payment and our kitchen is already preparing something delicious for you.
                        </p>
                    </div>

                    {/* Order Details Placeholder */}
                    <div className="p-8 bg-muted/30 rounded-3xl border border-border/50 text-left space-y-4 shadow-sm backdrop-blur-sm">
                        <div className="flex justify-between items-center text-sm uppercase tracking-wider font-bold text-muted-foreground">
                            <span>Order Status</span>
                            <span className="text-primary">Processing</span>
                        </div>
                        <div className="h-px bg-border/50" />
                        <p className="text-sm text-muted-foreground">
                            A confirmation email has been sent to your registered address. You can track your order status in your dashboard.
                        </p>
                        <div className="flex items-center gap-3 text-sm font-medium text-foreground italic">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            Estimated Delivery: 30 - 45 Mins
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild className="rounded-full h-14 px-10 font-bold uppercase tracking-wide shadow-gold hover:shadow-lg transition-all text-white gap-2 w-full sm:w-auto">
                            <Link href="/shop">
                                <ShoppingBag className="w-5 h-5" />
                                Keep Shopping
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-full h-14 px-10 font-bold uppercase tracking-wide hover:bg-primary transition-all gap-2 border-2 w-full sm:w-auto">
                            <Link href="/">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Dynamic Link to Dashboard if needed */}
                    {/* <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline group">
                        View Order in Dashboard
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link> */}
                </div>
            </main>

            <Footer />
        </div>
    );
}
