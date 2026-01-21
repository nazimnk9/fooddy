"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { MenuHero } from "@/components/MenuHero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import { Footer } from "@/components/Footer";
import { getCategories, getProducts, Category } from "@/services/menuService";
import { ProductCardSkeleton, CategoryTabsSkeleton } from "@/components/skeletons";

import pizzaMargherita from "@/assets/food/pizza-margherita.jpg"; // Fallback image

const MenuPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | "All">("All");
    const [products, setProducts] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const data = await getCategories();
                setCategories(data.results);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // Fetch Products based on active category
    useEffect(() => {
        const fetchMenuProducts = async () => {
            setLoading(true);
            try {
                let query = "is_popular=true";
                if (activeCategory !== "All") {
                    query += `&category__id=${activeCategory}`;
                }

                const data = await getProducts(query);

                const mappedProducts: FoodItem[] = data.results.map((product) => ({
                    id: product.id,
                    name: product.title,
                    description: product.description,
                    price: parseFloat(product.price),
                    image: product.images.length > 0 ? product.images[0].image : pizzaMargherita,
                    tags: product.tags.map(t => t.title),
                    rating: 5, // Default rating as API doesn't provide it
                    category: product.category.length > 0 ? product.category[0].title : "",
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuProducts();
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Banner */}
            <MenuHero />

            {/* Menu Section */}
            <section className="py-20">
                <div className="container-fooddy">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="section-title mb-4">What's Popular</h2>
                        <p className="section-subtitle">Clients' Most Popular Choice</p>
                    </div>

                    {/* Category Tabs */}
                    <div className="mb-12">
                        {loadingCategories ? (
                            <CategoryTabsSkeleton />
                        ) : (
                            <CategoryTabs
                                categories={categories}
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                            />
                        )}
                    </div>

                    {/* Food Grid */}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i}><ProductCardSkeleton viewMode="grid" /></div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {products.map((item, index) => (
                                    <FoodCard key={item.id} item={item} index={index} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-muted-foreground text-lg">
                                No items found in this category.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MenuPage;
