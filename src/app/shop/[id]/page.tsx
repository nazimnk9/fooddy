"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopSidebar } from "../components/ShopSidebar";
import { ProductCard } from "../components/ProductCard";
import { LayoutGrid, List as ListIcon } from "lucide-react";
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
                if (isTag) {
                    query = `tags__id=${categoryId}`;
                } else {
                    query = `category__id=${categoryId}`;
                }

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
    }, [categoryId, isTag]);

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

export default function ShopCategoryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ShopCategoryContent />
        </Suspense>
    );
}
