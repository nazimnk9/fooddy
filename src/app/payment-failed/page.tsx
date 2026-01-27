"use client";

import Link from "next/link";
import { XCircle, RefreshCw, AlertCircle, Home, ShoppingCart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center py-48 px-4">
                <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Failed Icon */}
                    <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-destructive/10 rounded-full text-destructive">
                        <XCircle className="w-20 h-20" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
                            Payment Failed
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            We're sorry, but your transaction could not be processed at this time. No funds were deducted from your account.
                        </p>
                    </div>

                    {/* Error Summary */}
                    <div className="p-8 bg-destructive/5 rounded-3xl border border-destructive/10 text-left space-y-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-destructive font-bold uppercase tracking-wider text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>Potential Reasons</span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive/40" />
                                Insufficient balance
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive/40" />
                                Incorrect card details
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive/40" />
                                Bank server connectivity
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-destructive/40" />
                                Verification needed
                            </li>
                        </ul>
                        <div className="h-px bg-destructive/10" />
                        <p className="text-sm text-muted-foreground">
                            Please try again with a different payment method or contact your bank for more information.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild className="rounded-full h-14 px-10 font-bold uppercase tracking-wide bg-primary hover:bg-primary/90 text-white gap-2 w-full sm:w-auto transition-all shadow-lg">
                            <Link href="/checkout">
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-full h-14 px-10 font-bold uppercase tracking-wide hover:bg-muted transition-all gap-2 border-2 w-full sm:w-auto">
                            <Link href="/">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Support Link */}
                    <p className="text-sm text-muted-foreground">
                        Need help? <Link href="/contact" className="font-semibold text-primary hover:underline">Contact Support</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
