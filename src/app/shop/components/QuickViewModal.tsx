"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/services/menuService";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!product) return null;

    const productImage = product.images?.[0]?.image || "";
    const productPrice = parseFloat(product.price);

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        // Assuming addToCart in context supports quantity or we call it multiple times
        // If addToCart only takes product, we might need to adjust it or call it in a loop
        // Standard practice is to have a quantity parameter
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        onClose();
        setQuantity(1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none sm:rounded-[32px] gap-0">
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                    {/* Left Side: Product Image */}
                    <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-[#f9f9f9]">
                        {productImage && (
                            <Image
                                src={productImage}
                                alt={product.title}
                                fill
                                className="object-fixed"
                            />
                        )}
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <DialogClose className="absolute right-6 top-6 rounded-full p-2 hover:bg-muted transition-colors">
                            <X className="w-6 h-6 text-amber-500" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-display font-medium text-[#444] mb-4">
                                    {product.title}
                                </h2>
                                <div className="text-3xl font-bold text-[#ff6b01]">
                                    ${productPrice.toFixed(2)}
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center bg-white border border-border rounded-full px-4 py-2 min-w-[140px] justify-between shadow-sm">
                                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                                    <div className="flex flex-col -mr-1">
                                        <button
                                            onClick={handleIncrement}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleDecrement}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Order Button */}
                                <Button
                                    onClick={handleAddToCart}
                                    className="bg-[#ffb936] hover:bg-[#ffa700] text-white font-bold h-[54px] px-10 rounded-[12px] uppercase flex items-center gap-2 border-none shadow-sm transition-transform active:scale-95"
                                >
                                    <ShoppingCart className="w-5 h-5 fill-current" />
                                    Order
                                </Button>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-3 pt-6 border-t border-border/50 text-sm">
                                <div className="flex gap-2">
                                    <span className="font-bold text-[#444]">Category:</span>
                                    <span className="text-muted-foreground">
                                        {product.category.map(c => c.title).join(", ")}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold text-[#444]">Tag:</span>
                                    <span className="text-muted-foreground">
                                        {product.tags.map(t => t.title).join(", ")}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold text-[#444]">Product ID:</span>
                                    <span className="text-muted-foreground">{product.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
