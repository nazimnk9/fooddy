import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin } from "lucide-react";

const tabs = ["All", "Pizza", "Pasta", "Sushi", "Burgers"];

const restaurants = [
  {
    name: "Pizza Palace",
    category: "Pizza",
    rating: 4.8,
    reviews: 234,
    location: "Downtown",
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  {
    name: "Sushi Master",
    category: "Sushi",
    rating: 4.9,
    reviews: 412,
    location: "Midtown",
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  },
  {
    name: "Burger Joint",
    category: "Burgers",
    rating: 4.7,
    reviews: 189,
    location: "Uptown",
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
  },
  {
    name: "Pasta House",
    category: "Pasta",
    rating: 4.6,
    reviews: 156,
    location: "West Side",
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
  {
    name: "Tokyo Garden",
    category: "Sushi",
    rating: 4.8,
    reviews: 287,
    location: "East Side",
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
  },
  {
    name: "Italian Corner",
    category: "Pasta",
    rating: 4.5,
    reviews: 98,
    location: "North District",
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
  },
];

export const Restaurants = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredRestaurants =
    activeTab === "All"
      ? restaurants
      : restaurants.filter((r) => r.category === activeTab);

  return (
    <section className="py-20 bg-secondary" id="restaurants">
      <div className="container-fooddy">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Featured Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Top Restaurants
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-fixed group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-background rounded-full px-3 py-1 flex items-center gap-1 shadow">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{restaurant.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                      {restaurant.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {restaurant.reviews} reviews
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {restaurant.location}
                    </span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
