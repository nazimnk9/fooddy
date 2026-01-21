"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/menuService";
import { ProductCardSkeleton } from "@/components/skeletons";

import dishPizza from "@/assets/dish-pizza.jpg"; // Fallback

interface PopularProduct {
  id: number;
  name: string;
  tags: string[];
  rating: number;
  description: string;
  price: number;
  image: string | any;
}

export const PopularDishes = () => {
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDishes = async () => {
      try {
        const data = await getProducts("is_popular=true");
        const mappedProducts = data.results.map((item: any) => ({
          id: item.id,
          name: item.title,
          tags: item.tags.map((t: any) => t.title),
          rating: 5, // Default mock rating
          description: item.description,
          price: parseFloat(item.price),
          image: item.images.length > 0 ? item.images[0].image : dishPizza,
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch popular dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDishes();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container-fooddy">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Clients' Most Popular Choice
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            What's Popular
          </motion.h2>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <ProductCardSkeleton viewMode="grid" />
              </div>
            ))
            : products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="dish-card group"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Eye className="w-4 h-4 text-black" />
                    </Link>
                    <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-muted-foreground uppercase"
                      >
                        {tag}
                        {idx < Math.min(product.tags.length, 3) - 1 && ","}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < product.rating
                            ? "fill-primary text-primary"
                            : "text-muted"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    {product.description}
                  </p>

                  {/* Price & Order */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Order
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
