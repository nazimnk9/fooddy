import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | StaticImageData;
    tags: string[];
    rating?: number;
    category: string;
}

interface FoodCardProps {
    item: FoodItem;
    index: number;
}

export const FoodCard = ({ item, index }: FoodCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Map FoodItem to Product shape expected by CartContext
        const productMapping: any = {
            id: item.id,
            title: item.name,
            price: item.price.toString(),
            description: item.description,
            images: [{ id: item.id, image: typeof item.image === 'string' ? item.image : (item.image as any).src }],
            category: [{ id: 0, title: item.category, image: null }],
            tags: item.tags.map((tag, idx) => ({ id: idx, title: tag })),
            is_popular: true
        };
        addToCart(productMapping);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                    }`}
            />
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="dish-card group"
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="dish-card-image object-fixed"
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                        href={`/product/${item.id}`}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs text-muted-foreground uppercase"
                        >
                            {tag}
                            {idx < item.tags.length - 1 && ","}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">
                    {item.name}
                </h3>

                {/* Rating */}
                {item.rating && (
                    <div className="flex items-center gap-1 mb-2">
                        {renderStars(item.rating)}
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    {item.description}
                </p>

                {/* Price & Order */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                        ${item.price.toFixed(2)}
                    </span>
                    <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleAddToCart}
                    >
                        Order
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
