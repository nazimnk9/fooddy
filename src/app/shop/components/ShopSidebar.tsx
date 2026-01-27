import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { getCategories, getTags, Category, Tag } from "@/services/menuService";
import { SidebarSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { X } from "lucide-react";

export function ShopSidebar() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeId = params?.id ? params.id.toString() : null;
    const isTag = searchParams.get('type') === 'tag';

    // Initialize from URL or defaults
    const urlMin = parseInt(searchParams.get('min_price') || "0");
    const urlMax = parseInt(searchParams.get('max_price') || "100");

    const [priceRange, setPriceRange] = useState([urlMin, urlMax]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    // Sync state with URL when searchParams change (e.g. on navigation)
    useEffect(() => {
        const min = parseInt(searchParams.get('min_price') || "0");
        const max = parseInt(searchParams.get('max_price') || "100");
        setPriceRange([min, max]);
    }, [searchParams]);
    const { cartItems, removeFromCart, isLoading: isCartLoading } = useCart();

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (parseFloat(item.product.price) * item.quantity);
    }, 0);

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
                <h3 className="text-2xl font-display font-medium text-foreground mb-6">Shopping Cart</h3>

                {cartItems.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No products in the cart.</p>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative w-16 h-16 shrink-0 bg-white rounded-sm overflow-hidden border border-border/50">
                                        {item.product.images?.[0]?.image && (
                                            <Image
                                                src={item.product.images[0].image}
                                                alt={item.product.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="text-[18px] font-display font-medium text-[#444] leading-tight transition-colors">
                                                {item.product.title}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-4 h-4 rounded bg-[#444] text-white flex items-center justify-center hover:bg-primary transition-colors mt-1 shrink-0"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="mt-1 flex items-center gap-1 text-sm">
                                            <span className="text-muted-foreground">{item.quantity} ×</span>
                                            <span className="text-[#ff6b01] font-bold">${parseFloat(item.product.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-border/50 space-y-6">
                            <div className="flex justify-end items-baseline gap-2 text-muted-foreground font-display">
                                <span className="text-lg font-medium">Subtotal:</span>
                                <span className="text-xl font-bold text-[#ff6b01]">${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/cart">
                                    <Button className="w-full rounded-full bg-[#ffb936] hover:bg-[#ffa700] text-white font-bold h-11 uppercase text-[11px] border-none shadow-sm">
                                        View Cart
                                    </Button>
                                </Link>
                                <Link href="/checkout">
                                    <Button className="w-full rounded-full bg-[#ffb936] hover:bg-[#ffa700] text-white font-bold h-11 uppercase text-[11px] border-none shadow-sm">
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
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
                    <Button
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('min_price', priceRange[0].toString());
                            params.set('max_price', priceRange[1].toString());
                            router.push(`?${params.toString()}`, { scroll: false });
                        }}
                        className="rounded-full px-6 font-bold text-xs h-9 uppercase"
                    >
                        Filter
                    </Button>
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
