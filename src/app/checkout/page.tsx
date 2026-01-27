"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Folder, FileText, Check, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/utils/cookieUtils";
import { BASE_URL } from "@/services/authService";
import { getAddresses, createAddress, Address } from "@/services/addressService";
import { getCart, CartItem } from "@/services/cartService";

import pizzaMargherita from "@/assets/food/pizza-margherita.jpg";

// interface Address {
//     id: number;
//     street: string;
//     city: string;
//     state: string;
//     zip_code: string;
//     user: number;
// }

export default function CheckoutPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [shipDifferent, setShipDifferent] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("check");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state for new address
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const fetchAddresses = async () => {
        try {
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const fetchCartData = async () => {
        try {
            const data = await getCart();
            setCartItems(data.results || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            await Promise.all([fetchAddresses(), fetchCartData()]);
            setLoading(false);
        };
        loadInitialData();
    }, []);

    const handleSaveAddress = async (e: React.MouseEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createAddress({
                street,
                city,
                state,
                zip_code: zipCode
            });
            // Clear form and reload addresses
            setStreet("");
            setCity("");
            setState("");
            setZipCode("");
            setShipDifferent(false);
            await fetchAddresses();
        } catch (error) {
            console.error("Error saving address:", error);
        } finally {
            setSaving(false);
        }
    };

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
                        CHECKOUT
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
                            Checkout
                        </span>
                    </nav>
                </div>
            </section>

            <main className="flex-1 py-16">
                <div className="container-fooddy max-w-6xl">

                    {/* Returning Customer Toggle */}
                    <div className="mb-8">
                        <div className="border-t-2 border-muted bg-muted/10 p-4 text-sm text-muted-foreground flex gap-2 items-center">
                            <Folder className="w-4 h-4" />
                            <span>Returning customer? <button onClick={() => setShowLogin(!showLogin)} className="text-primary hover:underline">Click here to login</button></span>
                        </div>

                        {showLogin && (
                            <div className="mt-6 p-6 border border-border rounded-sm animate-fade-in">
                                <p className="text-muted-foreground text-sm mb-4">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-username">Username or email <span className="text-destructive">*</span></Label>
                                        <Input id="login-username" className="bg-white rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">Password <span className="text-destructive">*</span></Label>
                                        <div className="relative">
                                            <Input
                                                id="login-password"
                                                type={showPassword ? "text" : "password"}
                                                className="bg-white rounded-full pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Checkbox id="remember-me" />
                                    <Label htmlFor="remember-me" className="font-normal text-muted-foreground">Remember me</Label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button className="rounded-full px-8 font-bold uppercase">Login</Button>
                                    <Link href="#" className="text-primary hover:underline text-sm">Lost your password?</Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coupon Toggle */}
                    <div className="mb-12">
                        <div className="border-t-2 border-muted bg-muted/10 p-4 text-sm text-muted-foreground flex gap-2 items-center">
                            <FileText className="w-4 h-4" />
                            <span>Have a coupon? <button onClick={() => setShowCoupon(!showCoupon)} className="text-primary hover:underline">Click here to enter your code</button></span>
                        </div>

                        {showCoupon && (
                            <div className="mt-6 p-6 border border-border rounded-sm animate-fade-in">
                                <p className="text-muted-foreground text-sm mb-4">If you have a coupon code, please apply it below.</p>
                                <div className="flex flex-wrap gap-4">
                                    <Input placeholder="Coupon code" className="bg-white rounded-full flex-1 max-w-sm" />
                                    <Button className="rounded-full px-8 font-bold uppercase">Apply Coupon</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Billing Details */}
                        <div>
                            <h2 className="text-2xl font-display font-semibold mb-6">Billing details</h2>

                            <div className="space-y-6">
                                {loading ? (
                                    <p className="text-muted-foreground">Loading addresses...</p>
                                ) : addresses.length === 0 ? (
                                    <p className="text-muted-foreground italic text-center py-4 bg-muted/5 rounded-xl border border-dashed border-border">No address found</p>
                                ) : (
                                    <div className="grid gap-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="p-4 rounded-xl border border-border bg-white flex justify-between items-center group hover:border-primary transition-colors">
                                                <div>
                                                    <p className="font-medium text-foreground">{address.street}</p>
                                                    <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.zip_code}</p>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                {/* This space reserved for alignment if needed, or 'Ship to different address' could go here inside a header */}
                            </div>

                            <div className="flex items-center gap-2 mb-8">
                                <Checkbox
                                    id="ship-different"
                                    checked={shipDifferent}
                                    onCheckedChange={(checked) => setShipDifferent(checked as boolean)}
                                />
                                <Label htmlFor="ship-different" className="font-bold cursor-pointer select-none uppercase">Create New Address</Label>
                            </div>

                            {shipDifferent && (
                                // <div className="mb-8 animate-fade-in space-y-6">
                                //     <div className="grid grid-cols-2 gap-6">
                                //         <div className="space-y-2">
                                //             <Label htmlFor="ship-firstName">First name <span className="text-destructive">*</span></Label>
                                //             <Input id="ship-firstName" className="bg-white rounded-full" required />
                                //         </div>
                                //         <div className="space-y-2">
                                //             <Label htmlFor="ship-lastName">Last name <span className="text-destructive">*</span></Label>
                                //             <Input id="ship-lastName" className="bg-white rounded-full" required />
                                //         </div>
                                //     </div>

                                //     <div className="space-y-2">
                                //         <Label htmlFor="ship-company">Company name (optional)</Label>
                                //         <Input id="ship-company" className="bg-white rounded-full" />
                                //     </div>

                                //     <div className="space-y-2">
                                //         <Label htmlFor="ship-country">Country / Region <span className="text-destructive">*</span></Label>
                                //         <Select>
                                //             <SelectTrigger className="bg-white rounded-full w-full">
                                //                 <SelectValue placeholder="Select a country / region..." />
                                //             </SelectTrigger>
                                //             <SelectContent>
                                //                 <SelectItem value="us">United States (US)</SelectItem>
                                //                 <SelectItem value="uk">United Kingdom (UK)</SelectItem>
                                //                 <SelectItem value="bd">Bangladesh</SelectItem>
                                //             </SelectContent>
                                //         </Select>
                                //     </div>

                                //     <div className="space-y-4">
                                //         <Label htmlFor="ship-address">Street address <span className="text-destructive">*</span></Label>
                                //         <Input id="ship-address" placeholder="House number and street name" className="bg-white rounded-full" required />
                                //         <Input id="ship-address2" placeholder="Apartment, suite, unit, etc. (optional)" className="bg-white rounded-full" />
                                //     </div>

                                //     <div className="space-y-2">
                                //         <Label htmlFor="ship-city">Town / City <span className="text-destructive">*</span></Label>
                                //         <Input id="ship-city" className="bg-white rounded-full" required />
                                //     </div>

                                //     <div className="space-y-2">
                                //         <Label htmlFor="ship-state">State <span className="text-destructive">*</span></Label>
                                //         <Select>
                                //             <SelectTrigger className="bg-white rounded-full w-full">
                                //                 <SelectValue placeholder="Select an option..." />
                                //             </SelectTrigger>
                                //             <SelectContent>
                                //                 <SelectItem value="ny">New York</SelectItem>
                                //                 <SelectItem value="ca">California</SelectItem>
                                //                 <SelectItem value="tx">Texas</SelectItem>
                                //             </SelectContent>
                                //         </Select>
                                //     </div>

                                //     <div className="space-y-2">
                                //         <Label htmlFor="ship-zip">ZIP Code <span className="text-destructive">*</span></Label>
                                //         <Input id="ship-zip" className="bg-white rounded-full" required />
                                //     </div>
                                // </div>
                                <div className="space-y-6">
                                    {/* <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name <span className="text-destructive">*</span></Label>
                                        <Input id="firstName" className="bg-white rounded-full" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name <span className="text-destructive">*</span></Label>
                                        <Input id="lastName" className="bg-white rounded-full" required />
                                    </div>
                                </div> */}

                                    {/* <div className="space-y-2">
                                    <Label htmlFor="company">Company name (optional)</Label>
                                    <Input id="company" className="bg-white rounded-full" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country / Region <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="bg-white rounded-full w-full">
                                            <SelectValue placeholder="Select a country / region..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">United States (US)</SelectItem>
                                            <SelectItem value="uk">United Kingdom (UK)</SelectItem>
                                            <SelectItem value="bd">Bangladesh</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                    <div className="space-y-4">
                                        <Label htmlFor="address">Street address <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="address"
                                            placeholder="House number and street name"
                                            className="bg-white rounded-full"
                                            required
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                        <Input id="address2" placeholder="Apartment, suite, unit, etc. (optional)" className="bg-white rounded-full" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">Town / City <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="city"
                                            className="bg-white rounded-full"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    {/* <div className="space-y-2">
                                    <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                                    <Select>
                                        <SelectTrigger className="bg-white rounded-full w-full">
                                            <SelectValue placeholder="Select an option..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ny">New York</SelectItem>
                                            <SelectItem value="ca">California</SelectItem>
                                            <SelectItem value="tx">Texas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="state"
                                            type="text"
                                            className="bg-white rounded-full"
                                            required
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="zip"
                                            className="bg-white rounded-full"
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleSaveAddress}
                                            disabled={saving || !street || !city || !state || !zipCode}
                                            className="px-8 h-12 rounded-full font-bold uppercase tracking-wide text-white shadow-gold hover:shadow-lg transition-all"
                                        >
                                            {saving ? "Saving..." : "Save Address"}
                                        </Button>
                                    </div>

                                    {/* <div className="space-y-2">
                                    <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
                                    <Input id="phone" type="tel" className="bg-white rounded-full" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address <span className="text-destructive">*</span></Label>
                                    <Input id="email" type="email" className="bg-white rounded-full" required />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <Checkbox
                                        id="create-account"
                                        checked={createAccount}
                                        onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
                                    />
                                    <Label htmlFor="create-account" className="font-normal cursor-pointer select-none">Create an account?</Label>
                                </div> */}
                                </div>
                            )}

                            {/* <div className="mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="order-notes" className="text-xs uppercase text-muted-foreground font-bold">Order notes (optional)</Label>
                                    <textarea
                                        id="order-notes"
                                        className="w-full min-h-[80px] px-4 py-3 rounded-2xl border border-input bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                        placeholder="Notes about your order, e.g. special notes for delivery."
                                    ></textarea>
                                </div>
                            </div> */}
                        </div>
                    </form>
                    <div className="mt-12 bg-white">
                        <h2 className="text-2xl font-display font-semibold mb-6">Your order</h2>

                        <div className="bg-muted/10 rounded-sm overflow-hidden mb-8">
                            {/* Header */}
                            <div className="grid grid-cols-2 bg-primary text-primary-foreground font-bold uppercase text-sm tracking-wider p-4">
                                <span>Product</span>
                                <span className="text-right">Subtotal</span>
                            </div>

                            {/* Items */}
                            {cartItems.map((item) => (
                                <div key={item.id} className="border-b border-border/60">
                                    <div className="grid grid-cols-2 p-4 text-sm">
                                        <span className="text-muted-foreground">{item.product.title} <span className="text-foreground font-semibold">× {item.quantity}</span></span>
                                        <span className="text-right font-bold text-primary">${parseFloat(item.total_price).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Subtotal */}
                            <div className="border-b border-border/60">
                                <div className="grid grid-cols-2 p-4">
                                    <span className="font-bold text-foreground text-sm uppercase">Subtotal</span>
                                    <span className="text-right font-bold text-primary">
                                        ${cartItems.reduce((acc, item) => acc + parseFloat(item.total_price), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="border-b border-border/60">
                                <div className="grid grid-cols-2 p-4">
                                    <span className="font-bold text-foreground text-sm uppercase">Shipping</span>
                                    <span className="text-right text-sm text-primary">Free shipping</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div>
                                <div className="grid grid-cols-2 p-4">
                                    <span className="font-bold text-foreground text-sm uppercase">Total</span>
                                    <span className="text-right font-bold text-primary text-xl">
                                        ${cartItems.reduce((acc, item) => acc + parseFloat(item.total_price), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-8 space-y-4">
                            <div className="flex items-start gap-2">
                                <input
                                    type="radio"
                                    id="payment-check"
                                    name="payment"
                                    value="check"
                                    checked={paymentMethod === "check"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-[7px] accent-primary"
                                />
                                <div>
                                    <Label htmlFor="payment-check" className="font-bold text-foreground cursor-pointer">Check payments</Label>
                                    {paymentMethod === "check" && (
                                        <div className="mt-2 p-4 bg-muted/20 text-muted-foreground text-sm animate-fade-in relative before:absolute before:top-[-8px] before:left-2 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-muted/20">
                                            Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <input
                                    type="radio"
                                    id="payment-cash"
                                    name="payment"
                                    value="cash"
                                    checked={paymentMethod === "cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-primary"
                                />
                                <Label htmlFor="payment-cash" className="font-normal text-foreground cursor-pointer">Cash on delivery</Label>
                                {paymentMethod === "cash" && (
                                    <div className="mt-2 p-4 bg-muted/20 text-muted-foreground text-sm animate-fade-in relative before:absolute before:top-[-8px] before:left-2 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-muted/20">
                                        Pay with cash upon delivery.
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="#" className="text-primary hover:underline">privacy policy</Link>.
                        </p>

                        <div className="flex justify-end">
                            <Button className="px-8 h-12 rounded-full font-bold uppercase tracking-wide text-white shadow-gold hover:shadow-lg transition-all">
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
