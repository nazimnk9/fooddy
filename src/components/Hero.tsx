import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Store, Smartphone, Truck } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const features = [
  { icon: Clock, text: "24/7 delivery" },
  { icon: Store, text: "2500 restaurants" },
  { icon: Smartphone, text: "order with app" },
  { icon: Truck, text: "fast delivery" },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      {/* Content */}
      <div className="container-fooddy relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Order Food Delivery
            <br />
            <span className="text-primary">From Your Favorite</span>
            <br />
            Restaurants!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 mb-8"
          >
            Order takeaway online from your favorite restaurants
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-gold">
              Menu
            </Button>
          </motion.div>
        </div>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
            >
              <feature.icon className="w-6 h-6 text-primary" />
              <span className="text-white text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
