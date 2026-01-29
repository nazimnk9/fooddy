"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ShopSidebar } from "../components/ShopSidebar";
import { ProductCard } from "../components/ProductCard";
import { LayoutGrid, List as ListIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getProducts, getCategories, getTags, Product as ApiProduct } from "@/services/menuService";
import sushiCategoryImg from "@/assets/sushi-category.jpg";

import { ProductCardSkeleton } from "@/components/skeletons";

function ShopCategoryContent() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const viewParam = searchParams.get('view');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayTitle, setDisplayTitle] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    const getOrderingValue = (value: string) => {
        switch (value) {
            case "newest": return "-created_at";
            case "oldest": return "created_at";
            case "price-low": return "price";
            case "price-high": return "-price";
            default: return "-created_at";
        }
    };

    // Check if we are filtering by tag based on query param ?type=tag
    const type = searchParams.get('type');
    const isTag = type === 'tag';

    const categoryId = params.id;

    useEffect(() => {
        if (viewParam === 'list') {
            setViewMode('list');
        } else {
            setViewMode('grid');
        }
    }, [viewParam]);

    useEffect(() => {
        const fetchData = async () => {
            if (!categoryId) return;

            setLoading(true);
            try {
                // Fetch Products
                let query = "";
                const ordering = getOrderingValue(sortBy);
                const minPrice = searchParams.get('min_price') || "";
                const maxPrice = searchParams.get('max_price') || "";

                const baseQuery = isTag ? `tags__id=${categoryId}` : `category__id=${categoryId}`;
                query = `${baseQuery}&ordering=${ordering}`;
                if (minPrice) query += `&min_price=${minPrice}`;
                if (maxPrice) query += `&max_price=${maxPrice}`;

                const productsData = await getProducts(query);

                // Fetch Title Info
                if (isTag) {
                    const tagsData = await getTags();
                    const tag = tagsData.results.find((t: any) => t.id.toString() === categoryId);
                    setDisplayTitle(tag ? tag.title : `Tag ${categoryId}`);
                } else {
                    const categoriesData = await getCategories();
                    const category = categoriesData.results.find((c: any) => c.id.toString() === categoryId);
                    setDisplayTitle(category ? category.title : `Category ${categoryId}`);
                }

                setProducts(productsData.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId, isTag, sortBy, searchParams]);

    const handleViewChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', mode);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        setSortBy("newest");
        const params = new URLSearchParams(searchParams.toString());
        params.delete('min_price');
        params.delete('max_price');

        // We MUST keep categoryId/tag context
        // But the URL for [id] is /shop/[categoryId]
        // So we only need to keep view and type=tag if applicable
        const view = params.get('view');
        const typeParam = params.get('type');

        const newParams = new URLSearchParams();
        if (view) newParams.set('view', view);
        if (typeParam) newParams.set('type', typeParam);

        const queryString = newParams.toString();
        router.push(queryString ? `?${queryString}` : `/shop/${categoryId}`, { scroll: false });
    };

    return (
        <div className="bg-background flex flex-col">

            {/* Hero Section */}
            <section
                className="hero-banner"
                style={{ backgroundImage: `url(${sushiCategoryImg.src})` }}
            >
                <div className="hero-banner-overlay" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-2 mt-8 tracking-wide">
                        SHOP
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Discovery Great Food</p>
                    <nav className="flex items-center justify-center gap-3 text-sm">
                        <Link href="/" className="breadcrumb-link uppercase tracking-wider">
                            Home
                        </Link>
                        <span className="text-white/50">|</span>
                        <Link href="/shop" className="breadcrumb-link uppercase tracking-wider">
                            Shop
                        </Link>
                        <span className="text-white/50">|</span>
                        <span className="breadcrumb-active uppercase tracking-wider">
                            {displayTitle}
                        </span>
                    </nav>
                </div>
            </section>

            <main className="flex-1 container-fooddy py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <ShopSidebar />
                    </aside>

                    {/* Main Content */}
                    <div>
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleViewChange('grid')}
                                    className={cn("p-2 rounded hover:text-primary transition-colors", viewMode === 'grid' ? "text-primary" : "text-muted-foreground")}
                                >
                                    <LayoutGrid className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleViewChange('list')}
                                    className={cn("p-2 rounded hover:text-primary transition-colors", viewMode === 'list' ? "text-primary" : "text-muted-foreground")}
                                >
                                    <ListIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="rounded-full border-muted-foreground/20 text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Reset</span>
                                </Button>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[180px] rounded-full border-muted-foreground/20">
                                        <SelectValue placeholder="Filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Sort by newest</SelectItem>
                                        <SelectItem value="oldest">Sort by oldest</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {loading ? (
                            <div className={cn(
                                "grid gap-8",
                                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
                            )}>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <ProductCardSkeleton key={i} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className={cn(
                                "grid gap-8",
                                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"
                            )}>
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-muted-foreground">No products found in this category.</div>
                        )}
                    </div>
                </div>
            </main>

        </div>
    );
}

export default function ShopCategoryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ShopCategoryContent />
        </Suspense>
    );
}
