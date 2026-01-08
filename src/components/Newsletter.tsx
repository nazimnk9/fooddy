import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export const Newsletter = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container-fooddy">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Content */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-primary-foreground/80">
              Get the latest updates, deals and exclusive offers
            </p>
          </div>

          {/* Form */}
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-white border-0 h-12"
              />
            </div>
            <Button className="bg-dark text-white hover:bg-dark-soft h-12 px-6">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
