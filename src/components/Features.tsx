import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  CreditCard,
  Headphones,
  Clock,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import downloadBg from "@/assets/Doi_Fuchka.jpeg";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery on orders over $50",
  },
  {
    icon: Shield,
    title: "Fresh Food",
    description: "Quality guaranteed fresh ingredients",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "100% secure payment methods",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Customer support around the clock",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Delivery within 30-45 minutes",
  },
  {
    icon: ThumbsUp,
    title: "Best Quality",
    description: "Only the best restaurants",
  },
];

export const Features = () => {
  return (
    <section className="relative py-20 text-white overflow-hidden" id="about">
      <div className="absolute inset-0 z-0">
        <Image
          src={downloadBg}
          alt="App Download Background"
          fill
          className="object-fixed"
        />
        <div className="absolute inset-0 bg-dark/80" />
      </div>
      <div className="container-fooddy relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm uppercase tracking-widest mb-4"
          >
            Our Benefits
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold"
          >
            Why People Choose Us
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
