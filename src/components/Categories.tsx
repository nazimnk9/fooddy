"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/menuService";
import placeholderImg from "@/assets/sushi-category.jpg"; // Fallback image

interface CategoryItem {
  id: number;
  name: string;
  count: number;
  description: string;
  image: any; // string (url) or StaticImageData
}

// Keep static imports for fallback/placeholders if needed, or remove if unused. 
// For now, removing unused imports to clean up, or keeping them if we map specific IDs to them (overkill).
// I will just use the API data.

import { CategoryCardSkeleton } from "@/components/skeletons";

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Transform API data to match UI requirements
        const mappedCategories = data.results.map((cat: any) => ({
          id: cat.id,
          name: cat.title,
          count: Math.floor(Math.random() * 20) + 1, // Mock count as API doesn't provide it
          description: "Find your favorite food here", // Mock description
          image: cat.image ? cat.image : placeholderImg,
        }));
        setCategories(mappedCategories);
      } catch (error: any) {
        console.error("Error loading categories", error);
        setError(error.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) return <div className="py-20 text-center text-red-500">Error: {error}</div>;

  return (
    <section className="py-20 bg-background" id="menu">
      <div className="container-fooddy">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Welcome to Dawat - Restaurant & Grills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            You will get <span className="text-primary italic">More than you expect</span> , order now!
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
            : categories.map((category, index) => (
              <Link href={`/shop/${category.id}`} key={category.name} className="block w-full h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="category-card aspect-[4/5] hover-lift group cursor-pointer"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={500}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="category-card-overlay" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                      {category.name}
                      <span className="text-sm font-sans font-normal ml-2">({category.count})</span>
                    </h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
        </div>

        {/* More Categories Button */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">and much more your favorite food</p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            More Categories
          </Button>
        </div>
      </div>
    </section>
  );
};
