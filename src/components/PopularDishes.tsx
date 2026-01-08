import { motion } from "framer-motion";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import dishPizza from "@/assets/dish-pizza.jpg";
import dishRavioli from "@/assets/dish-ravioli.jpg";
import dishLasagna from "@/assets/dish-lasagna.jpg";
import dishSushi from "@/assets/dish-sushi.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishTiramisu from "@/assets/dish-tiramisu.jpg";
import dishPepperoni from "@/assets/dish-pepperoni.jpg";
import dishPadthai from "@/assets/dish-padthai.jpg";

const dishes = [
  {
    name: "Pizza Margherita",
    tags: ["pizza", "vegetarian"],
    rating: 5,
    description: "With basil, mozzarella, tomatoes",
    price: 25,
    image: dishPizza,
  },
  {
    name: "Ravioli with Spinach",
    tags: ["pasta", "vegetarian"],
    rating: 5,
    description: "With spinach, basil, ricotta cheese",
    price: 25,
    image: dishRavioli,
  },
  {
    name: "Three-Meat Lasagna",
    tags: ["meat"],
    rating: 4,
    description: "Beef, pork, and bacon layers",
    price: 28,
    image: dishLasagna,
  },
  {
    name: "California Roll",
    tags: ["sushi"],
    rating: 5,
    description: "Crab, avocado, cucumber",
    price: 22,
    image: dishSushi,
  },
  {
    name: "Classic Cheeseburger",
    tags: ["burger"],
    rating: 4,
    description: "Beef patty, cheese, bacon",
    price: 18,
    image: dishBurger,
  },
  {
    name: "Tiramisu",
    tags: ["dessert"],
    rating: 5,
    description: "Coffee-soaked ladyfingers",
    price: 12,
    image: dishTiramisu,
  },
  {
    name: "Pepperoni Pizza",
    tags: ["pizza", "meat"],
    rating: 5,
    description: "Classic pepperoni, mozzarella",
    price: 24,
    image: dishPepperoni,
  },
  {
    name: "Pad Thai",
    tags: ["asian", "noodles"],
    rating: 4,
    description: "Shrimp, peanuts, lime",
    price: 20,
    image: dishPadthai,
  },
];

export const PopularDishes = () => {
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
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="dish-card group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-card-image"
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground"
                    >
                      {tag}
                      {dish.tags.indexOf(tag) < dish.tags.length - 1 && ","}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">
                  {dish.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < dish.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {dish.description}
                </p>

                {/* Price & Order */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    ${dish.price}.00
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
