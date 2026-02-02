"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, ChevronUp, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductById, Product } from "@/services/menuService";
import { useCart } from "@/context/CartContext";
import { ProductDetailSkeleton } from "@/components/skeletons";
import dishPizza from "@/assets/dish-pizza.jpg"; // Fallback image
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
    const { addToCart } = useCart();

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err: any) {
                console.error("Error fetching product:", err);
                setError(err.message || "Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;

            if (e.key === "Escape") setIsLightboxOpen(false);
            if (e.key === "ArrowLeft") handlePrevImage();
            if (e.key === "ArrowRight") handleNextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, currentImageIndex]);

    if (loading) {
        return (
            <div className="bg-background flex flex-col">
                <div className="flex-1 py-24">
                    <ProductDetailSkeleton />
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-background flex flex-col">
                <div className="flex-1 container-fooddy py-32 text-center">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                    <p className="text-muted-foreground mt-4">{error || `The product with ID ${id} does not exist.`}</p>
                    <div className="mt-8">
                        <Button asChild>
                            <Link href="/shop">Back to Shop</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const images = product.images.map(img => img.image).length > 0
        ? product.images.map(img => img.image)
        : [dishPizza];

    const currentImage = images[currentImageIndex];

    const handlePrevImage = () => {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const renderStars = (rating: number = 5) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                    }`}
            />
        ));
    };

    return (
        <div className="bg-background flex flex-col">
            <main className="flex-1 pt-20 pb-20">
                <div className="container-fooddy">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Left Column - Image */}
                        <div
                            className="relative aspect-square rounded-3xl overflow-hidden bg-muted cursor-zoom-in group"
                            onClick={() => setIsLightboxOpen(true)}
                        >
                            <Image
                                src={currentImage}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md group-hover:bg-white transition-colors">
                                <span className="sr-only">Zoom</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
                                {product.title}
                            </h1>

                            {/* <div className="flex items-center justify-between mb-6">
                                <span className="text-2xl font-bold text-primary">
                                    ${parseFloat(product.price).toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1">
                                    {renderStars(5)}
                                </div>
                            </div> */}

                            <p className="text-muted-foreground mb-8">
                                {product.description}
                            </p>

                            {/* Delivery Date Mock */}
                            {/* <div className="mb-6">
                                <label className="block text-sm text-muted-foreground mb-2">Delivery Date:</label>
                                <div className="relative max-w-[200px]">
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div> */}

                            {/* Actions */}
                            <div className="flex items-center gap-4 mb-8">
                                {/* Quantity */}
                                <div className="flex items-center justify-between bg-white border border-border rounded-full px-4 h-12 w-32">
                                    <span className="text-foreground font-semibold">{quantity}</span>
                                    <div className="flex flex-col gap-0.5 ml-2">
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <ChevronUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Order Button */}
                                <Button
                                    onClick={() => addToCart(product, quantity)}
                                    className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add To Cart
                                </Button>
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-2 text-sm text-muted-foreground border-t border-border/50 pt-6">
                                <p>
                                    <span className="font-semibold text-foreground">Categories: </span>
                                    {product.category.map(c => c.title).join(", ")}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Tags: </span>
                                    {product.tags.map(t => t.title).join(", ")}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Product ID: </span>
                                    {product.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mb-20">
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={cn(
                                    "px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors",
                                    activeTab === "description"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                            >
                                Description
                            </button>
                            {/* <button
                                onClick={() => setActiveTab("reviews")}
                                className={cn(
                                    "px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors",
                                    activeTab === "reviews"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                            >
                                Reviews (1)
                            </button> */}
                        </div>

                        <div className="text-muted-foreground leading-relaxed">
                            {activeTab === "description" ? (
                                <div className="space-y-4">
                                    <p>{product.description}</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Reviews content will go here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Image Lightbox - Framer Motion Overlay */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-[110]"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all z-[110]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevImage();
                                    }}
                                >
                                    <ChevronLeft className="w-10 h-10" />
                                </button>
                                <button
                                    className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all z-[110]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNextImage();
                                    }}
                                >
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            </>
                        )}

                        {/* Full Screen Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[currentImageIndex]}
                                alt={product.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 font-medium tracking-widest uppercase text-sm">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
