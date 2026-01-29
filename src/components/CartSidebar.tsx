"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useCart, UICartItem } from "@/context/CartContext";

export function CartSheetContent({ onAuthRequired }: { onAuthRequired?: () => void }) {
    const { cartItems, removeFromCart, updateQuantity, isLoading, closeCart, isLoggedIn } = useCart();

    const subtotal = cartItems.reduce((acc: number, item: UICartItem) => {
        const price = parseFloat(item.product.price);
        return acc + (price * item.quantity);
    }, 0);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-6 pt-2">
                        {cartItems.length === 0 ? (
                            <div className="text-muted-foreground text-center py-20">
                                <div className="mb-4 opacity-20 flex justify-center">
                                    <ShoppingCart className="w-16 h-16" />
                                </div>
                                <p className="text-lg font-medium">Your cart is empty</p>
                                <p className="text-sm">Add some delicious dishes to get started!</p>
                            </div>
                        ) : (
                            cartItems.map((item: UICartItem) => (
                                <div key={item.id} className="flex gap-4 items-center bg-secondary/30 p-4 rounded-2xl shadow-sm border border-border/40 relative group transition-all hover:shadow-md hover:border-primary/20">
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute right-1 top-1 text-muted-foreground hover:text-destructive transition-colors opacity-100 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm ring-1 ring-border/20">
                                        {item.product.images?.[0]?.image && (
                                            <Image
                                                src={item.product.images[0].image}
                                                alt={item.product.title}
                                                fill
                                                className="object-fixed"
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-2">
                                        <h4 className="font-bold text-foreground text-sm leading-tight mb-1 line-clamp-2">{item.product.title}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold text-primary">${parseFloat(item.product.price).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 bg-white rounded-full p-1.5 shadow-sm border border-border/50">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary hover:text-white text-primary transition-all duration-300"
                                            disabled={isLoading}
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={isLoading || item.quantity <= 1}
                                            className={cn(
                                                "w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300",
                                                (isLoading || item.quantity <= 1)
                                                    ? "text-muted-foreground/30 cursor-not-allowed"
                                                    : "text-primary hover:bg-primary hover:text-white"
                                            )}
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="pt-6 mt-auto border-t border-border/50">
                <div className="space-y-5">
                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Subtotal</span>
                        <span className="text-2xl font-bold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <Link href="/checkout"
                            className="w-full"
                            onClick={(e) => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    onAuthRequired?.();
                                } else {
                                    closeCart();
                                }
                            }}
                        >
                            <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                                CHECKOUT NOW
                            </Button>
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/cart" className="w-full" onClick={closeCart}>
                                <Button variant="outline" className="w-full h-11 border-primary/20 text-primary hover:bg-foreground font-bold rounded-xl">
                                    VIEW CART
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                onClick={closeCart}
                                className="w-full h-11 text-muted-foreground hover:text-foreground hover:bg-muted/50 font-bold rounded-xl text-xs uppercase tracking-widest"
                            >
                                CLOSE
                            </Button>
                        </div>
                    </div>

                    <div className="text-center pb-2">
                        <Link href="/menu" onClick={closeCart}>
                            <span className="text-primary hover:underline text-sm font-semibold cursor-pointer">
                                Continue Shopping
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
