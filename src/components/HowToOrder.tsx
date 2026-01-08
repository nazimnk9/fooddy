import { motion } from "framer-motion";
import { MapPin, Store, ClipboardList, Truck } from "lucide-react";

const steps = [
  { icon: MapPin, title: "Choose your location", step: 1 },
  { icon: Store, title: "Choose restaurant", step: 2 },
  { icon: ClipboardList, title: "Make your order", step: 3 },
  { icon: Truck, title: "Food is on the way", step: 4 },
];

export const HowToOrder = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container-fooddy">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Follow the Steps
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            How to order?
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div className="step-number mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mx-auto shadow-md group-hover:shadow-lg transition-shadow">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
