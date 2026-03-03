"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/menuService";
import { ProductCardSkeleton } from "@/components/skeletons";
import { useCart } from "@/context/CartContext";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const PopularMenu = () => {
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product: PopularProduct) => {
    const productMapping: any = {
      id: product.id,
      title: product.name,
      price: product.price.toString(),
      description: product.description,
      images: [
        {
          id: product.id,
          image:
            typeof product.image === "string"
              ? product.image
              : (product.image as any).src,
        },
      ],
      category: [],
      tags: product.tags.map((tag, idx) => ({ id: idx, title: tag })),
      is_popular: true,
    };
    addToCart(productMapping);
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Popular Right Now
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what our customers are loving most at the moment
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} viewMode="grid" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {products.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={typeof item.image === "string" ? item.image : item.image.src}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.tags.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-deep-blue text-white text-xs font-semibold rounded-full">
                        {item.tags[0]}
                      </span>
                    </div>
                  )}
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link
                      href={`/product/${item.id}`}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                      <Eye className="w-5 h-5 text-charcoal" />
                    </Link>
                    {/* <button
                      onClick={() => handleAddToCart(item)}
                      className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-deep-blue-hover transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button> */}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xl font-semibold text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-rating">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-semibold text-foreground">
                      €{item.price.toFixed(2)}
                    </span>
                    <Button
                      variant="accent"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PopularMenu;
