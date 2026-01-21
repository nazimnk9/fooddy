import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { getCategories, getTags, Category, Tag } from "@/services/menuService";
import { SidebarSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";

export function ShopSidebar() {
    const params = useParams();
    const searchParams = useSearchParams();
    const activeId = params?.id ? params.id.toString() : null;
    const isTag = searchParams.get('type') === 'tag';

    const [priceRange, setPriceRange] = useState([0, 100]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, tagsData] = await Promise.all([
                    getCategories(),
                    getTags()
                ]);
                setCategories(categoriesData.results);
                setTags(tagsData.results);
            } catch (error) {
                console.error("Error fetching sidebar data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <SidebarSkeleton />;
    }

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
                    {loading ? <p className="text-sm">Loading...</p> : categories.map((cat) => {
                        const isActive = !isTag && activeId === cat.id.toString();
                        return (
                            <div key={cat.id} className="flex items-center space-x-2">
                                <Link href={`/shop/${cat.id}`} className="flex items-center gap-2 group w-full">
                                    <Checkbox
                                        id={`cat-${cat.id}`}
                                        checked={isActive}
                                        className={cn(
                                            "rounded-full border-muted-foreground/40 group-hover:border-primary",
                                            isActive && "bg-primary border-primary"
                                        )}
                                    />
                                    <label
                                        htmlFor={`cat-${cat.id}`}
                                        className={cn(
                                            "text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors flex-1",
                                            isActive ? "text-primary" : "text-muted-foreground/80 group-hover:text-primary"
                                        )}
                                    >
                                        {cat.title}
                                    </label>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tags */}
            <div className="bg-[#f4f4f4] p-8 rounded-sm">
                <h3 className="text-2xl font-display font-medium text-foreground mb-6">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {loading ? <p className="text-sm">Loading...</p> : tags.map(tag => {
                        const isActive = isTag && activeId === tag.id.toString();
                        return (
                            <Link
                                key={tag.id}
                                href={`/shop/${tag.id}?type=tag`}
                                className={cn(
                                    "px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors shadow-sm",
                                    isActive
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-white text-muted-foreground/80 hover:text-primary"
                                )}
                            >
                                {tag.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
