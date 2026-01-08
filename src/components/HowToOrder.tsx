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
              className="text-center group relative md:mb-0 mb-8 last:mb-0"
            >
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 rounded-full mb-4 bg-background flex items-center justify-center mx-auto shadow-md group-hover:shadow-lg transition-shadow">
                  <step.icon className="w-full h-full text-primary p-3" />
                </div>
                <div className="step-number mx-auto group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                {step.title}
              </h3>

              {/* Arrow connector between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[8.5rem] -right-[55%] w-full h-12 pointer-events-none z-0">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full opacity-40"
                  >
                    <path
                      d="M10 9 Q50 40 90 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="text-muted-foreground"
                    />
                    <path
                      d="M85 9 L90 12 L86 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
