import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import sushiImg from "@/assets/sushi-category.jpg";
import pizzaImg from "@/assets/pizza-category.jpg";
import burgerImg from "@/assets/burger-category.jpg";
import dessertImg from "@/assets/dessert-category.jpg";

import antipasti from "@/assets/antipasti.png";
import drinks from "@/assets/drinks1.jpg";
import kacchi from "@/assets/kacchi.jpg";
import naan from "@/assets/naan.jpg";
import dessert from "@/assets/dessert.jpg";
import colazione from "@/assets/colazione.jpeg";

import chicken from "@/assets/chicken.jpg";
import curry from "@/assets/curry.jpg";

const categories = [
  { name: "ANTIPASTI", count: 6, description: "Samosa, Singara, Paratha, Halim, Fuchka", image: antipasti },
  { name: "DRINKS", count: 7, description: "The favourites drinks items", image: drinks },
  { name: "PIATTI PRINCIPALI A BASE DI RISO", count: 4, description: "From Vegetarian to Three-Meat", image: kacchi },
  { name: "DESSERT", count: 5, description: "Find Desserts for Every Taste", image: dessert },
  { name: "NAAN", count: 3, description: "Find Desserts for Every Taste", image: naan },
  { name: "COLAZIONE", count: 2, description: "Find Desserts for Every Taste", image: colazione },
  { name: "SECONDI", count: 2, description: "Find Desserts for Every Taste", image: chicken },
  { name: "CURRY E RISO", count: 10, description: "Find Desserts for Every Taste", image: curry },
];

export const Categories = () => {
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
          {categories.map((category, index) => (
            <Link href="/shop" key={category.name} className="block w-full h-full">
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
                  className="w-full h-full object-fixed transition-transform duration-500 group-hover:scale-110"
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
