"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useCart, UICartItem } from "@/context/CartContext";

export function CartSheetContent() {
    const { cartItems, removeFromCart, updateQuantity, isLoading } = useCart();

    const subtotal = cartItems.reduce((acc: number, item: UICartItem) => {
        const price = parseFloat(item.product.price);
        return acc + (price * item.quantity);
    }, 0);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-6 pt-6">
                        {cartItems.length === 0 ? (
                            <div className="text-white text-center py-10 opacity-70">
                                Your cart is empty
                            </div>
                        ) : (
                            cartItems.map((item: UICartItem) => (
                                <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-border/50 relative group">
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border border-border">
                                        {item.product.images?.[0]?.image && (
                                            <Image
                                                src={item.product.images[0].image}
                                                alt={item.product.title}
                                                fill
                                                className="object-fixed"
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-6">
                                        <h4 className="font-semibold text-foreground text-sm leading-tight mb-2 pr-4">{item.product.title}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-primary">${parseFloat(item.product.price).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-1 bg-muted/20 rounded-full p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-xs font-bold transition-all"
                                            disabled={isLoading}
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                        <span className="text-xs font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={isLoading || item.quantity <= 1}
                                            className={cn(
                                                "w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-xs font-bold transition-all",
                                                (isLoading || item.quantity <= 1) && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="pt-6 mt-auto">
                <Separator className="mb-4 bg-white/20" />
                <div className="space-y-4">
                    {/* Total */}
                    <div className="flex items-center justify-between text-lg font-semibold">
                        <span className="text-white/80">Total</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/cart" className="w-full">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                                CART
                            </Button>
                        </Link>
                        <Link href="/checkout" className="w-full">
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                                CHECKOUT
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center">
                        <Button variant="link" className="text-white/80 hover:text-white text-xs uppercase tracking-wider font-semibold">
                            continue shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
