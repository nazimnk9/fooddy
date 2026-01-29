import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dishPepperoni from "@/assets/dish-pepperoni.jpg";

export const DealCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to 5 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <section className="py-20 bg-[#0b0f19]">
      <div className="container-fooddy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-primary-foreground/80 text-sm uppercase tracking-widest mb-4">
              Limited Time Offer
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Deals of The Day
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get up to 50% off on selected items. Hurry up, offer ends soon!
            </p>

            {/* Countdown */}
            <div className="flex justify-center lg:justify-start gap-4 mb-8">
              {timeBlocks.map((block) => (
                <div key={block.label} className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-foreground rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {block.value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-primary-foreground/80 uppercase">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Order Now
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image
              src={dishPepperoni}
              alt="Deal of the day"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl object-fixed"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-foreground rounded-full flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary">50%</span>
              <span className="text-xs text-primary">OFF</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
