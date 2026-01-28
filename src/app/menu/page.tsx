"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories, getProducts, Category } from "@/services/menuService";
import { ProductCardSkeleton, CategoryTabsSkeleton } from "@/components/skeletons";

import pizzaMargherita from "@/assets/food/pizza-margherita.jpg"; // Fallback image

const MenuPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | "All">("All");
    const [products, setProducts] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

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

    // Fetch Products based on active category and search query
    useEffect(() => {
        const fetchMenuProducts = async () => {
            setLoading(true);
            try {
                let params = [];

                if (activeCategory !== "All") {
                    params.push(`category__id=${activeCategory}`);
                }

                if (searchQuery) {
                    params.push(`search=${encodeURIComponent(searchQuery)}`);
                }

                const query = params.join("&");
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
    }, [activeCategory, searchQuery]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setActiveCategory("All");
        setSearchQuery(searchInput);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Menu Section */}
            <section className="py-20 mt-12">
                <div className="container-fooddy">
                    {/* Section Header with Search */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                        <div>
                            <h2 className="section-title mb-2">Our Menu Items</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" variant="outline" className="h-11 px-6" onClick={() => {
                                        setSearchQuery("");
                                        setSearchInput("");
                                    }}>
                                Reset
                            </Button>
                        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search your favorite dishes..."
                                    className="pl-10 h-11 border-muted-foreground/20 focus:border-accent"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="accent" className="h-11 px-6">
                                Search
                            </Button>
                        </form>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mb-12">
                        {loadingCategories ? (
                            <CategoryTabsSkeleton />
                        ) : (
                            <CategoryTabs
                                categories={categories}
                                activeCategory={activeCategory}
                                onCategoryChange={(id) => {
                                    setActiveCategory(id);
                                    if (searchQuery) {
                                        setSearchQuery("");
                                        setSearchInput("");
                                    }
                                }}
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
                                key={`${activeCategory}-${searchQuery}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
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
                                {searchQuery
                                    ? `No items found matching "${searchQuery}"`
                                    : "No items found in this category."}
                            </p>
                            {/* {searchQuery && (
                                <Button
                                    variant="link"
                                    className="text-accent mt-2"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSearchInput("");
                                    }}
                                >
                                    Clear search
                                </Button>
                            )} */}
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
