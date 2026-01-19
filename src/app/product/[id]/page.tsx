"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

// Import food images (duplicated from menu page)
import pizzaMargherita from "@/assets/food/pizza-margherita.jpg";
import tagliatelle from "@/assets/food/tagliatelle.jpg";
import lasagna from "@/assets/food/lasagna.jpg";
import linguine from "@/assets/food/linguine.jpg";
import sushi from "@/assets/food/sushi.jpg";
import salad from "@/assets/food/salad.jpg";
import chinese from "@/assets/food/chinese.jpg";
import tiramisu from "@/assets/food/tiramisu.jpg";
import ravioli from "@/assets/food/ravioli.jpg";

// Additional imports from PopularDishes
import dishPizza from "@/assets/dish-pizza.jpg";
import dishRavioli from "@/assets/dish-ravioli.jpg";
import dishLasagna from "@/assets/dish-lasagna.jpg";
import dishSushi from "@/assets/dish-sushi.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishTiramisu from "@/assets/dish-tiramisu.jpg";
import dishPepperoni from "@/assets/dish-pepperoni.jpg";
import dishPadthai from "@/assets/dish-padthai.jpg";
import Sweets from "@/assets/Sweets.jpeg";
import Chicken_curry from "@/assets/Chicken_curry.jpeg";
import Doi_Fuchka from "@/assets/Doi_Fuchka.jpeg";
import Roast from "@/assets/Roast.jpeg";
import Samosa from "@/assets/Samosa.jpeg";

const foodItems = [
    // Original Menu Items
    {
        id: 1,
        name: "Pizza Margherita",
        description: "With basil, mozzarella, tomatoes",
        fullDescription: "Lorem ipsum dolor sit amet...",
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
        fullDescription: "Lorem ipsum dolor sit amet...",
        price: 27.0,
        image: tagliatelle,
        tags: ["pasta", "vegetarian"],
        category: "Pasta",
    },
    {
        id: 3,
        name: "Three-Meat Special Lasagna",
        description: "With special garlic cream sauce, ricotta cheese and tomatoes",
        fullDescription: "Lorem ipsum dolor sit amet...",
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
        fullDescription: "Lorem ipsum dolor sit amet...",
        price: 26.0,
        image: linguine,
        tags: ["pasta", "vegetarian"],
        category: "Pasta",
    },
    {
        id: 5,
        name: "Ravioli with Spinach and Ricotta",
        description: "With spinach, basil, garlic and ricotta cheese",
        fullDescription: "Lorem ipsum dolor sit amet...",
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
        fullDescription: "Lorem ipsum dolor sit amet...",
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
        fullDescription: "Lorem ipsum dolor sit amet...",
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
        fullDescription: "Lorem ipsum dolor sit amet...",
        price: 24.0,
        image: chinese,
        tags: ["chinese", "seafood"],
        category: "Chinese",
    },
    {
        id: 9,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone",
        fullDescription: "Lorem ipsum dolor sit amet...",
        price: 12.0,
        image: tiramisu,
        tags: ["desserts", "italian"],
        rating: 5,
        category: "Desserts",
    },

    // Additional Items from PopularDishes
    {
        id: 101,
        name: "Rosogolla",
        description: "Sweet dessert",
        fullDescription: "Authentic sweet dessert...",
        price: 25.0,
        image: Sweets,
        tags: ["Rosogolla"],
        rating: 5,
        category: "Desserts",
    },
    {
        id: 102,
        name: "Chicken Curry",
        description: "With spices",
        fullDescription: "Spicy and savory chicken curry...",
        price: 25.0,
        image: Chicken_curry,
        tags: ["Chicken Curry"],
        rating: 5,
        category: "Curry",
    },
    {
        id: 103,
        name: "Doi Fuchka",
        description: "Dessert with jaggery",
        fullDescription: "Traditional street food dessert...",
        price: 25.0,
        image: Doi_Fuchka,
        tags: ["Doi Fuchka"],
        rating: 5,
        category: "Desserts",
    },
    {
        id: 104,
        name: "Roast",
        description: "With spices",
        fullDescription: "Premium celebration roast...",
        price: 25.0,
        image: Roast,
        tags: ["Roast"],
        rating: 5,
        category: "Main",
    },
    {
        id: 105,
        name: "Samosa",
        description: "With spices",
        fullDescription: "Crispy fried pastry with savory filling...",
        price: 25.0,
        image: Samosa,
        tags: ["Samosa"],
        rating: 5,
        category: "Snacks",
    },
    {
        id: 106,
        name: "California Roll",
        description: "Crab, avocado, cucumber",
        fullDescription: "Fresh sushi roll with crab and avocado...",
        price: 22.0,
        image: dishSushi,
        tags: ["sushi"],
        rating: 5,
        category: "Sushi",
    },
    {
        id: 107,
        name: "Classic Cheeseburger",
        description: "Beef patty, cheese, bacon",
        fullDescription: "Juicy beef patty with melted cheese...",
        price: 18.0,
        image: dishBurger,
        tags: ["burger"],
        rating: 4,
        category: "Burger",
    },
    {
        id: 108,
        name: "Pepperoni Pizza",
        description: "Classic pepperoni, mozzarella",
        fullDescription: "Spicy pepperoni with gooey mozzarella...",
        price: 24.0,
        image: dishPepperoni,
        tags: ["pizza", "meat"],
        rating: 5,
        category: "Pizza",
    },
    {
        id: 109,
        name: "Pad Thai",
        description: "Shrimp, peanuts, lime",
        fullDescription: "Classic Thai stir-fried noodles...",
        price: 20.0,
        image: dishPadthai,
        tags: ["asian", "noodles"],
        rating: 4,
        category: "Asian",
    },
];

export default function ProductPage() {
    const params = useParams();
    const id = Number(params.id);
    const item = foodItems.find((i) => i.id === id);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

    if (!item) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 container-fooddy py-32 text-center">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                    <p className="text-muted-foreground mt-4">The product with ID {id} does not exist.</p>
                    <div className="mt-8">
                        <Button asChild>
                            <a href="/menu">Back to Menu</a>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

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
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 pt-52 pb-20">
                <div className="container-fooddy">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Left Column - Image */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                                <span className="sr-only">Zoom</span>
                                {/* Mock zoom icon/functionality if needed, image showed search icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
                                {item.name}
                            </h1>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-2xl font-bold text-primary">
                                    ${item.price.toFixed(2)}
                                </span>
                                <div className="flex items-center gap-1">
                                    {renderStars(item.rating)}
                                </div>
                            </div>

                            <p className="text-muted-foreground mb-8">
                                {item.description}
                            </p>

                            {/* Delivery Date Mock */}
                            <div className="mb-6">
                                <label className="block text-sm text-muted-foreground mb-2">Delivery Date:</label>
                                <div className="relative max-w-[200px]">
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-primary"
                                    />
                                    {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" /> */}
                                </div>
                            </div>

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
                                <Button className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Order
                                </Button>
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-2 text-sm text-muted-foreground border-t border-border/50 pt-6">
                                <p>
                                    <span className="font-semibold text-foreground">Categories: </span>
                                    {item.category}, {item.tags.join(", ")}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Tags: </span>
                                    {item.tags.join(", ")}
                                </p>
                                <p>
                                    <span className="font-semibold text-foreground">Product ID: </span>
                                    {210 + item.id}
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
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={cn(
                                    "px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors",
                                    activeTab === "reviews"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                            >
                                Reviews (1)
                            </button>
                        </div>

                        <div className="text-muted-foreground leading-relaxed">
                            {activeTab === "description" ? (
                                <div className="space-y-4">
                                    <p>{item.fullDescription || "Lorem ipsum dolor sit amet, sed felis donec nulla turpis pharetra, sit neque dapibus ultricies bibendum suscipit tristique, ullamcorper massa in, ut blandit id, justo urna at scelerisque."}</p>
                                    <p>Non pellentesque, sit lectus gravida diam sociosqu dictumst nec, congue eius cras molestie molestie tellus volutpat, non molestie scelerisque a tempore neque faucibus.</p>
                                    <p>Vel rutrum elit vitae, urna vestibulum odio lorem vitae arcu volutpat, interdum nec lectus et platea. Mauris quam volutpat sem, a erat wisi a quam.</p>
                                    <p>Id libero dictumst integer phasellus sit, tellus scelerisque viverra, fusce a, et eget amet. Risus in neque lacus odio, vitae felis ac enim.</p>
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

            <Footer />
        </div>
    );
}
