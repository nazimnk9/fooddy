import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

import { Product } from "@/services/menuService";

interface ProductCardProps {
    product: Product;
    viewMode: 'grid' | 'list';
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
    const productPrice = parseFloat(product.price);
    const productImage = product.images?.[0]?.image || "";

    const { addToCart } = useCart();

    return (
        <div className={cn(
            "group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
            viewMode === 'list' ? "flex flex-col md:flex-row gap-6 p-4" : "flex flex-col"
        )}>
            {/* Image Container */}
            <div className={cn(
                "relative overflow-hidden shrink-0",
                viewMode === 'list' ? "w-full md:w-[300px] aspect-[4/3] rounded-lg" : "w-full aspect-[4/3]"
            )}>
                {productImage && (
                    <Image
                        src={productImage}
                        alt={product.title}
                        fill
                        className="object-fixed transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                        href={`/product/${product.id}`}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        <Eye className="w-4 h-4 text-black" />
                    </Link>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={cn(
                "flex flex-col",
                viewMode === 'list' ? "flex-1 justify-center items-start py-2" : "p-6 items-center text-center"
            )}>
                <h3 className={cn("font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors",
                    viewMode === 'list' ? "text-2xl" : "text-xl"
                )}>
                    {product.title}
                </h3>

                {/* Rating - Placeholder as API doesn't provide it yet */}
                <div className="flex gap-0.5 mb-3 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3 fill-current", i < 4 ? "text-amber-400" : "text-gray-200")} />
                    ))}
                </div>

                <p className={cn("text-muted-foreground text-sm mb-3 line-clamp-2", viewMode !== 'list' && "mx-auto")}>
                    {product.description}
                </p>

                <div className="text-primary font-bold text-lg mb-4">
                    ${productPrice.toFixed(2)}
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={() => addToCart(product)}
                        className="rounded-full font-bold px-6 uppercase flex items-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Order
                    </Button>
                    <Button variant="outline" className="rounded-full font-bold px-6 uppercase border-none bg-amber-400 text-white hover:bg-amber-500 hover:text-white">
                        Quick View
                    </Button>
                </div>
            </div>
        </div>
    );
}
