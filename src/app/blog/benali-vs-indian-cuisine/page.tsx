"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from "next/link";

import { Button } from '@/components/ui/button';
import blog2 from '@/assets/blog-n-3.png';

const BengaliVsIndianCuisine = () => {
  return (
    <div className="min-h-screen">
      
      <main className="">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={blog2.src}
            alt="Bengali vs Indian Cuisine"
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
                  Food Culture
                </span>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-soft-white mb-4 max-w-4xl">
                  Bengali vs Indian Cuisine: What’s the Difference?
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
                    <span>7 min read</span>
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
                    Many people in Italy are familiar with “Indian food” — but few realize how diverse it truly is.
                    Bengali cuisine, from the eastern part of the Indian subcontinent, has its own identity,
                    flavors, and traditions that set it apart.
                    At our restaurant in <strong>Piazza dei Mirti 19, Rome</strong>, we proudly serve
                    <strong> Authentic Bengali Cuisine</strong>—not generic Indian dishes.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Indian Cuisine Is Not One Cuisine
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    India is home to hundreds of regional cuisines.
                    What many people recognize as “Indian food” abroad often comes from North India:
                    creamy gravies, heavy use of butter, and tandoor cooking.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Bengali cuisine is different. It is shaped by rivers, seasons, and simplicity.
                    The focus is on balance, natural flavors, and letting ingredients speak for themselves.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Key Differences at a Glance
                  </h2>

                  <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 my-8">
                    <ul className="space-y-4 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">🐟 Seafood Focus:</strong><br />
                        Bengali cuisine heavily features fish and seafood, while many Indian restaurants abroad focus on chicken and lamb.
                      </li>
                      <li>
                        <strong className="text-foreground">🌿 Spice Philosophy:</strong><br />
                        Bengali food uses fewer spices but in smarter combinations—mustard, nigella seeds, green chili, and turmeric.
                      </li>
                      <li>
                        <strong className="text-foreground">🍚 Rice First:</strong><br />
                        Rice is the heart of every Bengali meal, not just a side dish.
                      </li>
                      <li>
                        <strong className="text-foreground">🧈 Less Cream, More Depth:</strong><br />
                        Bengali curries are lighter, less creamy, and easier on the palate.
                      </li>
                      <li>
                        <strong className="text-foreground">🍬 Signature Desserts:</strong><br />
                        Bengali sweets are milk-based, soft, and gently sweet—very different from syrup-heavy desserts.
                      </li>
                    </ul>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Mustard Oil vs Butter & Cream
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    One of the biggest surprises for first-time guests is mustard oil.
                    Where North Indian food often uses butter and cream, Bengali cuisine uses mustard oil
                    to create aroma and sharpness—especially in fish and vegetable dishes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Think of it like olive oil in Italian cooking: bold, expressive, and essential to authenticity.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Familiar Comfort for Italian Diners
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Despite the differences, Bengali food feels surprisingly familiar to Italian guests.
                    Slow cooking, seasonal ingredients, seafood dishes, and comforting rice-based meals
                    align beautifully with Italian food values.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Dishes like <strong>Bhuna Khichuri</strong> often remind guests of risotto,
                    while simple sides like fried eggplant feel instantly recognizable.
                  </p>

                  <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 md:p-8 my-8">
                    <p className="text-foreground font-medium italic text-lg">
                      “Bengali cuisine isn’t about overpowering spice.
                      It’s about comfort, balance, and respect for ingredients—values Italians understand deeply.”
                    </p>
                    <p className="text-accent font-semibold mt-4">— Team Dawat</p>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
                    Experience the Difference in Rome
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    If you’ve tried Indian food before, Bengali cuisine will feel like discovering
                    a new chapter of a familiar story.
                    And if this is your first time, you’re starting with something truly special.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    📍 <strong>Piazza dei Mirti 19, Rome, Italy – 00172</strong><br />
                    Join us and experience authentic Bengali flavors—served with care, balance,
                    and respect for tradition.
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

export default BengaliVsIndianCuisine;
