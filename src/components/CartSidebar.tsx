"use client";

import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Import sample images (reusing hero assets or placeholders)
import heroSweets from "@/assets/Sweets.jpeg";
import heroChicken from "@/assets/Chicken_curry.jpeg";
import heroRoast from "@/assets/Roast.jpeg";

const cartItems = [
    {
        id: 1,
        name: "California Roll with Black Sesame",
        price: 27.00,
        quantity: 1,
        image: heroSweets, // Proxy for sushi
    },
    {
        id: 2,
        name: "Three-Meat Special Lasagna",
        price: 30.00,
        quantity: 1,
        image: heroChicken, // Proxy for lasagna
    },
    {
        id: 3,
        name: "Singapore Sling",
        price: 8.00,
        quantity: 1,
        image: heroRoast, // Proxy for drink
    },
];

export function CartSheetContent() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-6 pt-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-border/50 relative group">
                                {/* Remove Button */}
                                <button className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border border-border">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0 pr-6">
                                    <h4 className="font-semibold text-foreground text-sm leading-tight mb-2 pr-4">{item.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-primary">${item.price.toFixed(2)}</span>

                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col items-center gap-1">
                                                {/* Simple Vertical or Horizontal layout for quantity? 
                                User image usually has + / number / - 
                                Let's assume standard horizontal or vertical based on space.
                                I'll do horizontal for safety.
                            */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Controls - Right Side vertical or horizontal? 
                   Let's put them on the right side akin to some premium designs 
                   OR inline.
                   Looking at typical "Three-Meat Special" cards, quantity is often + / - vertical or horizontal.
                   I will implement a nice vertical stack if space permits or horizontal.
                   I'll go with Horizontal near price for compactness.
                */}
                                <div className="flex flex-col items-center gap-1 bg-muted/20 rounded-full p-1">
                                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-xs font-bold transition-all">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-semibold">{item.quantity}</span>
                                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-xs font-bold transition-all">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
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
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                            CART
                        </Button>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                            CHECKOUT
                        </Button>
                    </div>

                    <div className="text-center">
                        <Button variant="link" className="text-white/80 hover:text-white text-xs uppercase tracking-wider font-semibold">
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
