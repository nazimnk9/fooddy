
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Store, Smartphone, Truck, ChevronRight, ChevronLeft } from "lucide-react";

// Import images
import heroImage from "@/assets/hero-food.jpg";
import heroSweets from "@/assets/Sweets.jpeg";
import heroChicken from "@/assets/Chicken_curry.jpeg";
import heroRoast from "@/assets/Roast.jpeg";

const slides = [
  {
    image: heroImage,
    title1: "Order Food Delivery",
    titleHighlighted: "From Your Favorite",
    title2: "Restaurants!",
    description: "Order takeaway online from your favorite restaurants",
    buttonText: "Menu"
  },
  {
    image: heroSweets,
    title1: "Sweeten Your Day",
    titleHighlighted: "With Delicious",
    title2: "Desserts!",
    description: "Indulge in our wide variety of traditional sweets",
    buttonText: "Order Sweets"
  },
  {
    image: heroChicken,
    title1: "Spicy & Savory",
    titleHighlighted: "Authentic",
    title2: "Chicken Curry!",
    description: "Taste the rich flavors of our chef's special curry",
    buttonText: "Order Curry"
  },
  {
    image: heroRoast,
    title1: "Celebration Special",
    titleHighlighted: "Premium",
    title2: "Roast!",
    description: "Perfect choice for your special family gatherings",
    buttonText: "Order Roast"
  }
];

const features = [
  { icon: Clock, text: "24/7 delivery" },
  { icon: Store, text: "2500 restaurants" },
  { icon: Smartphone, text: "order with app" },
  { icon: Truck, text: "fast delivery" },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Hero Background"
            className="w-full h-full object-fixed"
            priority
          />
          <div className="absolute inset-0 bg-dark/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container-fooddy relative z-10 py-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <div key={currentSlide}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
              >
                {slides[currentSlide].title1}
                <br />
                <span className="text-primary">{slides[currentSlide].titleHighlighted}</span>
                <br />
                {slides[currentSlide].title2}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/80 mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-gold">
                  {slides[currentSlide].buttonText}
                </Button>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-primary scale-125" : "bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-2 right-4 md:right-10 flex gap-4 z-20">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>


        {/* Feature Badges - Kept Constant */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </section>
  );
};
