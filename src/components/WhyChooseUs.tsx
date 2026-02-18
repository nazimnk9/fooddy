import { motion } from 'framer-motion';
import { Award, Clock, Leaf, Truck } from 'lucide-react';
import whyChooseUsBg from '@/assets/why-choose-us-bg.jpg';

const features = [
  {
    icon: Award,
    title: 'Authentic Recipes',
    description: 'Traditional Italian recipes passed down through generations',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Locally sourced and imported premium Italian ingredients',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Hot and fresh delivery within 30-45 minutes',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary delivery on orders above €30',
  },
];

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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const WhyChooseUs = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${whyChooseUsBg.src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/70" />

      {/* Content */}
      <div className="relative container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-soft-white mb-6 leading-tight">
              Why People Choose <span className="text-[#C5A059]">Dawat</span>
            </h2>
            <p className="text-soft-white/80 text-lg mb-8 leading-relaxed">
              For over a decade, we've been serving the finest Italian cuisine in the heart of Italy. 
              Our passion for food, commitment to quality, and dedication to customer satisfaction 
              make us the preferred choice for food lovers.
            </p>
            {/* <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="block font-heading text-4xl font-semibold text-accent">10+</span>
                <span className="text-soft-white/70 text-sm">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-soft-white/20" />
              <div className="text-center">
                <span className="block font-heading text-4xl font-semibold text-accent">50k+</span>
                <span className="text-soft-white/70 text-sm">Happy Customers</span>
              </div>
              <div className="w-px h-12 bg-soft-white/20" />
              <div className="text-center">
                <span className="block font-heading text-4xl font-semibold text-accent">100+</span>
                <span className="text-soft-white/70 text-sm">Menu Items</span>
              </div>
            </div> */}
          </motion.div>

          {/* Right Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-soft-white/10 backdrop-blur-sm rounded-xl p-6 border border-soft-white/10 hover:bg-soft-white/15 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#C5A059]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-soft-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-soft-white/70 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
