"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCategories } from "@/services/menuService";
import { CategoryCardSkeleton } from "@/components/skeletons";
import placeholderImg from "@/assets/sushi-category.jpg";

interface CategoryItem {
  id: number;
  name: string;
  count: number;
  description: string;
  image: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const MenuCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const mappedCategories = data.results.map((cat: any) => ({
          id: cat.id,
          name: cat.title,
          count: Math.floor(Math.random() * 20) + 1, // Mock count
          description: "Find your favorite food here",
          image: cat.image ? cat.image : placeholderImg,
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error loading categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="menu" className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h4 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Explore Our Menu
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the finest Italian dishes crafted with passion and the freshest ingredients
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {categories.map((category) => (
              <Link href={`/order-now/${category.id}`} key={category.id}>
                <motion.div
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer card-hover"
                >
                  <img
                    src={typeof category.image === 'string' ? category.image : category.image.src}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                    <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm">
                      {category.count} items
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MenuCategories;
