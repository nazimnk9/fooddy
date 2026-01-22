"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopSidebar } from "./components/ShopSidebar";
import { ProductCard } from "./components/ProductCard";
import { LayoutGrid, List as ListIcon, Loader2 } from "lucide-react";
import { getProducts, Product } from "@/services/menuService";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ProductCardSkeleton } from "@/components/skeletons";

// Assets
import sushiCategoryImg from "@/assets/sushi-category.jpg";

// Mock data removed as we are now using the API

import { Suspense } from "react";

function ShopPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewParam = searchParams.get('view');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // When clicking "Shop" from Header, searchParams might be empty or just contain 'view'.
                // The user requested no query params specifically for the API call in this case.
                const response = await getProducts();
                setProducts(response.results);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Only fetch on mount to satisfy "do not pass any query params" when coming from Header

    useEffect(() => {
        if (viewParam === 'list') {
            setViewMode('list');
        } else {
            setViewMode('grid');
        }
    }, [viewParam]);

    const handleViewChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', mode);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Hero Section */}
            <section
                className="hero-banner"
                style={{ backgroundImage: `url(${sushiCategoryImg.src})` }}
            >
                <div className="hero-banner-overlay" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-2 mt-8 tracking-wide">
                        Shop
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Discovery Great Food</p>
                    <nav className="flex items-center justify-center gap-3 text-sm">
                        <Link href="/" className="breadcrumb-link uppercase tracking-wider">
                            Home
                        </Link>
                        <span className="text-white/50">|</span>
                        {/* <Link href="/shop" className="breadcrumb-link uppercase tracking-wider">
                            Shop
                        </Link> */}
                        {/* <span className="text-white/50">|</span> */}
                        <span className="breadcrumb-active uppercase tracking-wider">
                            Shop
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

                            <div className="flex items-center">
                                <Select defaultValue="latest">
                                    <SelectTrigger className="w-[180px] rounded-full border-muted-foreground/20">
                                        <SelectValue placeholder="Sort by latest" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="latest">Sort by latest</SelectItem>
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

            <Footer />
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ShopPageContent />
        </Suspense>
    );
}
