"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { MenuHero } from "@/components/MenuHero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import { Footer } from "@/components/Footer";

// Import food images
import pizzaMargherita from "@/assets/food/pizza-margherita.jpg";
import tagliatelle from "@/assets/food/tagliatelle.jpg";
import lasagna from "@/assets/food/lasagna.jpg";
import linguine from "@/assets/food/linguine.jpg";
import sushi from "@/assets/food/sushi.jpg";
import salad from "@/assets/food/salad.jpg";
import chinese from "@/assets/food/chinese.jpg";
import tiramisu from "@/assets/food/tiramisu.jpg";
import ravioli from "@/assets/food/ravioli.jpg";

const categories = [
    "All",
    "Pizza",
    "Pasta",
    "Sushi",
    "Vegetarian",
    "Salads",
    "Chinese",
    "Italian",
    "Desserts",
];

const foodItems: FoodItem[] = [
    {
        id: 1,
        name: "Pizza Margherita",
        description: "With basil, mozzarella, tomatoes",
        price: 25.0,
        image: pizzaMargherita,
        tags: ["pizza", "vegetarian"],
        rating: 5,
        category: "Pizza",
    },
    {
        id: 2,
        name: "Veggie Tagliatelle Bolognese",
        description: "With spinach, mushrooms and garlic",
        price: 27.0,
        image: tagliatelle,
        tags: ["pasta", "vegetarian"],
        category: "Pasta",
    },
    {
        id: 3,
        name: "Three-Meat Special Lasagna",
        description: "With special garlic cream sauce, ricotta cheese and tomatoes",
        price: 30.0,
        image: lasagna,
        tags: ["meat", "italian"],
        rating: 4,
        category: "Italian",
    },
    {
        id: 4,
        name: "Linguine with Two-Cheese Sauce",
        description: "With mozzarella and parmesan",
        price: 26.0,
        image: linguine,
        tags: ["pasta", "vegetarian"],
        category: "Pasta",
    },
    {
        id: 5,
        name: "Ravioli with Spinach and Ricotta",
        description: "With spinach, basil, garlic and ricotta cheese",
        price: 28.0,
        image: ravioli,
        tags: ["pasta", "vegetarian"],
        rating: 5,
        category: "Pasta",
    },
    {
        id: 6,
        name: "Salmon Sushi Platter",
        description: "Fresh salmon nigiri and maki rolls with wasabi",
        price: 35.0,
        image: sushi,
        tags: ["sushi", "seafood"],
        rating: 5,
        category: "Sushi",
    },
    {
        id: 7,
        name: "Garden Fresh Salad",
        description: "With avocado, cherry tomatoes and feta cheese",
        price: 18.0,
        image: salad,
        tags: ["salads", "vegetarian"],
        rating: 4,
        category: "Salads",
    },
    {
        id: 8,
        name: "Shrimp Fried Rice",
        description: "Traditional Chinese fried rice with vegetables and shrimp",
        price: 24.0,
        image: chinese,
        tags: ["chinese", "seafood"],
        category: "Chinese",
    },
    {
        id: 9,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone",
        price: 12.0,
        image: tiramisu,
        tags: ["desserts", "italian"],
        rating: 5,
        category: "Desserts",
    },
];

const MenuPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") {
            return foodItems;
        }
        return foodItems.filter((item) => {
            const categoryLower = activeCategory.toLowerCase();
            return (
                item.category.toLowerCase() === categoryLower ||
                item.tags.some((tag) => tag.toLowerCase() === categoryLower)
            );
        });
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
                        <CategoryTabs
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </div>

                    {/* Food Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredItems.map((item, index) => (
                                <FoodCard key={item.id} item={item} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
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
