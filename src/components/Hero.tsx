
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import { useRouter } from 'next/navigation';

const slides = [
  {
    image: hero1,
    title: 'Experience Authentic Italian Cuisine',
    subtitle: 'Where tradition meets modern culinary excellence',
  },
  {
    image: hero2,
    title: 'Fresh Pasta Made Daily',
    subtitle: 'Handcrafted with passion and the finest ingredients',
  },
  {
    image: hero3,
    title: 'Wood-Fired Pizza Perfection',
    subtitle: 'Crispy, flavorful, and authentically Italian',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image.src})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-soft-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-soft-white/90 mb-8 font-body">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="font-bold bg-[#1e4dc9] hover:bg-[#1e4dc9]/90 text-white min-w-[140px] rounded-md transition-all duration-300"
              >
                Order Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/menu')}
                className="font-bold border-2 border-white text-white bg-transparent hover:bg-white/10 min-w-[140px] rounded-md transition-all duration-300"
              >
                View Menu
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-soft-white/10 backdrop-blur-sm hover:bg-soft-white/20 transition-colors duration-300 text-soft-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-soft-white/10 backdrop-blur-sm hover:bg-soft-white/20 transition-colors duration-300 text-soft-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-soft-white/50 hover:bg-soft-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
