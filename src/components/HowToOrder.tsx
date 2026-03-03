import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    step: '01',
    title: 'Add to Cart',
    description: 'Browse our menu and add your favorite dishes to the cart',
  },
  {
    icon: MapPin,
    step: '02',
    title: 'Enter Location',
    description: 'Write your delivery address (within 5km radius of our restaurant)',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Place Order',
    description: 'Review your order and confirm payment securely',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Food Delivered',
    description: 'Relax while we prepare and deliver your delicious meal',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const HowToOrder = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h4 className="font-heading text-2xl font-semibold text-foreground mb-4">
            How to Order
          </h4>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting your favorite Italian dishes delivered is easy. Just follow these simple steps.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full card-hover relative overflow-hidden">
                {/* Step Number Background */}
                <div className="absolute -right-4 -top-4 text-8xl font-heading font-semibold text-secondary opacity-50">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToOrder;
