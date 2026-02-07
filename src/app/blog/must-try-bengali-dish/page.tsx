"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from "next/link";

import { Button } from '@/components/ui/button';

import blog3 from '@/assets/blog-n-2.png';

const MustTryBengaliDishes = () => {
  return (
    <div className="min-h-screen">
      
      <main className="">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={blog3.src}
            alt="Must-Try Bengali Dishes in Rome"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-12 md:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">
                  Food Guide
                </span>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-soft-white mb-4 max-w-4xl">
                  Must-Try Bengali Dishes for First-Time Guests in Our Restaurant
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-soft-white/80 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Team Dawat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>February 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>6 min read</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                    Visiting a Bengali restaurant for the first time can be exciting—and a little overwhelming.
                    With rich aromas, unique spices, and comforting textures, Bengali cuisine offers something truly special.
                    At our restaurant in <strong>Piazza dei Mirti 19, Rome</strong>, we guide first-time guests through the
                    most beloved dishes that define authentic Bengali cooking.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Start with the Classics
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Bengali food is all about balance—spice, comfort, and depth of flavor.
                    If this is your first visit, these dishes are the perfect introduction.
                    They are traditional, widely loved, and showcase the soul of Bengal.
                  </p>

                  <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 my-8">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                      Must-Try Dishes for First-Time Guests:
                    </h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">🍚 Bhuna Khichuri</strong><br />
                        A comforting blend of rice and lentils cooked with mild spices.
                        Often compared to risotto, it’s rich, warming, and perfect for Italian diners who love cozy dishes.
                      </li>
                      <li>
                        <strong className="text-foreground">🐔 Chicken Bengali Curry</strong><br />
                        Slow-cooked with onions, ginger, garlic, and whole spices.
                        Flavorful but not overpowering—ideal for first-time guests.
                      </li>
                      <li>
                        <strong className="text-foreground">🐟 Shorshe Fish (Mustard Fish)</strong><br />
                        A signature Bengali dish using mustard paste.
                        Bold, aromatic, and a favorite among seafood lovers in Italy.
                      </li>
                      <li>
                        <strong className="text-foreground">🥔 Aloo Bhorta</strong><br />
                        Mashed potatoes with mustard oil and green chili.
                        Simple, rustic, and incredibly satisfying.
                      </li>
                      <li>
                        <strong className="text-foreground">🍆 Begun Bhaja</strong><br />
                        Crispy fried eggplant slices—familiar in texture, exciting in flavor.
                        A perfect side dish.
                      </li>
                    </ul>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Spice Levels Made Comfortable
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    One common myth is that Bengali food is extremely spicy.
                    In reality, it’s about aroma and balance, not heat.
                    At our restaurant, spice levels can always be adjusted—so you can enjoy the flavors comfortably.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Don’t Skip Dessert
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Bengali meals traditionally end on a sweet note.
                    Our desserts are light, milky, and gently sweet—perfect after a flavorful meal.
                  </p>

                  <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 md:p-8 my-8">
                    <p className="text-foreground font-medium italic text-lg">
                      “For first-time guests, Bengali cuisine feels new yet familiar.
                      It’s comfort food with a story—just like the best Italian dishes.”
                    </p>
                    <p className="text-accent font-semibold mt-4">— Team Dawat</p>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Visit Us in Rome
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    If you’re curious to explore something beyond the usual,
                    we invite you to experience <strong>Authentic Bengali Cuisine</strong>
                    right here in Rome.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    📍 <strong>Piazza dei Mirti 19, Rome, Italy – 00172</strong><br />
                    Whether you’re Bengali and missing home or Italian and discovering new flavors,
                    our kitchen is ready to welcome you.
                  </p>
                </div>

                {/* Back Button */}
                <div className="mt-12 pt-8 border-t border-border">
                  <Link href="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-4"
              >
                <div className="lg:sticky lg:top-28 space-y-8">
                  {/* Share Section */}
                  {/* <div className="bg-card rounded-2xl p-6 shadow-card">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Share this article
                    </h3>
                  </div> */}

                  {/* Author Profile */}
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Team Dawat</p>
                        <p className="text-sm text-muted-foreground">Bengali Cuisine in Italy</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We share stories, flavors, and traditions from Bengal—served fresh in Italy. Our blog explores food culture,
                      ingredients, and the dishes that bring people together.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="bg-charcoal rounded-2xl p-6 text-center">
                    <h3 className="font-heading text-xl font-bold text-soft-white mb-3">
                      Curious about Bengali flavors?
                    </h3>
                    <p className="text-soft-white/70 text-sm mb-4">
                      Try our signature dishes and discover why Bengal feels at home in Italy.
                    </p>
                    <Link href="/menu">
                      <Button variant="accent" className="w-full">
                        Explore Menu
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MustTryBengaliDishes;
