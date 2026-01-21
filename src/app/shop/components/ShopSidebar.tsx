import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
    "BAGETCI",
    "BURGERS",
    "COOK KING",
    "DESSERTS",
    "DRINKS",
    "FUSION",
    "ITALIAN",
    "MEAT",
    "MUNCH",
    "OCEAN POKE",
    "PASTA",
    "PHUKET",
    "PIZZA",
    "SALADS",
    "SUSHI",
    "VEGETARIAN",
];

const tags = [
    "dessert", "desserts", "drink", "fish", "meat", "pasta", "pizza", "salads", "seafood", "vegetarian"
];

export function ShopSidebar() {
    const [priceRange, setPriceRange] = useState([0, 100]);

    return (
        <div className="space-y-8">
            {/* Shopping Cart */}
            <div className="bg-[#f4f4f4] p-8 rounded-sm">
                <h3 className="text-2xl font-display font-medium text-foreground mb-4">Shopping Cart</h3>
                <p className="text-muted-foreground text-sm">No products in the cart.</p>
            </div>

            {/* Price Filter */}
            <div className="bg-[#f4f4f4] p-8 rounded-sm">
                <h3 className="text-2xl font-display font-medium text-foreground mb-6">Price Filter</h3>
                <div className="mb-6">
                    <Slider
                        value={priceRange}
                        onValueChange={setPriceRange} // Update state on dragon
                        min={0}
                        max={100}
                        step={1}
                        className="mb-4"
                    />
                    <div className="flex justify-end text-sm font-bold text-muted-foreground">
                        Price: <span className="text-primary ml-1">${priceRange[0]} — ${priceRange[1]}</span>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="rounded-full px-6 font-bold text-xs h-9 uppercase">Filter</Button>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-[#f4f4f4] p-8 rounded-sm">
                <h3 className="text-2xl font-display font-medium text-foreground mb-6">Categories</h3>
                <div className="space-y-3">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <Checkbox id={cat} className="rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary border-muted-foreground/40" />
                            <label
                                htmlFor={cat}
                                className="text-xs font-bold text-muted-foreground/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase tracking-wide cursor-pointer hover:text-primary transition-colors"
                            >
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="bg-[#f4f4f4] p-8 rounded-sm">
                <h3 className="text-2xl font-display font-medium text-foreground mb-6">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="bg-white px-4 py-2 rounded-full text-xs font-bold text-muted-foreground/80 hover:text-primary cursor-pointer transition-colors shadow-sm">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
