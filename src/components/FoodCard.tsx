import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye, Plus } from "lucide-react";
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
            images: [{
                id: item.id,
                image: typeof item.image === 'string' ? item.image : (item.image as any).src
            }],
            category: [{ id: 0, title: item.category, image: null }],
            tags: item.tags.map((tag, idx) => ({ id: idx, title: tag })),
            is_popular: true
        };
        addToCart(productMapping);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-fixed transition-transform duration-500 group-hover:scale-110"
                />

                {/* Floating Tag */}
                {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-deep-blue text-white text-xs font-semibold rounded-full">
                            {item.tags[0]}
                        </span>
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link
                        href={`/product/${item.id}`}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                        <Eye className="w-5 h-5 text-charcoal" />
                    </Link>
                    {/* <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-deep-blue-hover transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button> */}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xl font-bold text-foreground line-clamp-1">
                        {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-rating">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{item.rating || 5}</span>
                    </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {item.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-foreground">
                        €{item.price.toFixed(2)}
                    </span>
                    <Button
                        variant="accent"
                        size="sm"
                        className="gap-2"
                        onClick={handleAddToCart}
                    >
                        <Plus className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
