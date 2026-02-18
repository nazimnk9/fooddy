"use client";
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from "next/link";

// import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import blog2 from '@/assets/blog-n-1-1.png';

const TasteOfBengalInItaly = () => {
  return (
    <div className="min-h-screen">
      {/* <header /> */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src = {blog2.src}
            alt="A Taste of Bengal in Italy"
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
                  Culture & Cuisine
                </span>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-soft-white mb-4 max-w-4xl">
                  A Taste of Bengal in Italy: How Bengali Cuisine Fits the Italian Palate
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-soft-white/80 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Team Dawat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>February 7, 2026</span>
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
                    What happens when Bengal’s bold aromas meet Italy’s love for comfort and tradition?
                    At Dawat, we believe Bengali cuisine doesn’t just belong in Italy—it feels right at home.
                    From slow-cooked curries to mustard-forward flavors, many Bengali dishes naturally match the Italian palate:
                    warm, balanced, and made for sharing.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Two Cultures, One Love: Food That Brings People Together
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Italians and Bengalis have more in common than you might expect—especially in the kitchen.
                    Both cultures value meals as a moment of connection: family-style tables, recipes passed down,
                    and the belief that good food should feel like a hug.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Bengali cuisine shares Italy’s devotion to tradition, but expresses it through a different language:
                    fragrant spices, tangy mustard, seasonal vegetables, and slow-simmered sauces that build deep flavor over time.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Why Bengali Flavors Work for Italian Taste Buds
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Italian cuisine is all about balance—salt, acidity, fat, sweetness—and so is Bengali food.
                    The difference is where the balance comes from. Bengal uses mustard, chilies, nigella seeds, and ghee
                    to create layers of flavor that feel bold but never random.
                  </p>

                  <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 my-8">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                      What Italians Often Love About Bengali Cuisine:
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-foreground">Slow-cooked sauces:</strong> Like ragù, Bengali curries deepen with time and patience</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-foreground">Comfort food energy:</strong> Khichuri has the same “cozy bowl” feeling as risotto</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-foreground">Seafood love:</strong> Fish curries resonate in a country that treasures fresh seafood</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong className="text-foreground">Sweet endings:</strong> Bengali desserts offer a gentle, milky sweetness Italians appreciate</span>
                      </li>
                    </ul>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Familiar Textures: From Risotto to Khichuri
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    If you love creamy risotto, you’ll understand the magic of <strong>Bhuna Khichuri</strong>—
                    rice and lentils cooked into a rich, comforting dish that pairs perfectly with fried eggplant,
                    pickles, or slow-cooked meats.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    That’s the beauty: Bengali dishes aren’t “foreign” in feeling—they’re different in flavor,
                    but familiar in comfort. Like Italian cuisine, the satisfaction comes from warmth,
                    depth, and honest ingredients.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Mustard: Bengal’s Answer to Italian Olive Oil
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    In Italy, olive oil is a signature. In Bengal, it’s <strong>mustard oil</strong>.
                    Its aroma is bold, slightly peppery, and unforgettable—especially in fish dishes and vegetable preparations.
                    When used carefully, it adds character the way a great extra-virgin olive oil does.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    At Dawat, we balance authenticity with comfort—keeping flavors true, while making sure each dish is
                    approachable for diners experiencing Bengali cuisine for the first time.
                  </p>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Pairing Ideas Italians Enjoy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Pairing is where cultures meet beautifully. Many Italian diners love combining Bengali mains with
                    familiar sides—like crispy fries, simple salad, or even bread—while still enjoying the richness of curry.
                    (And yes—spice level can always be customized.)
                  </p>

                  <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 md:p-8 my-8">
                    <p className="text-foreground font-medium italic text-lg">
                      "Food travels better than anything else. When Italians taste Bengali cuisine, they don’t just discover new spices—
                      they recognize the same love for tradition, comfort, and togetherness."
                    </p>
                    <p className="text-accent font-semibold mt-4">— Team Dawat</p>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-12 mb-6">
                    Come Experience Bengal—Right Here in Italy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Whether you’re Bengali and missing home, or Italian and curious about something new,
                    our kitchen is built for you. We serve food that’s deeply Bengali in soul—while fitting naturally into
                    Italy’s love for good ingredients and unforgettable meals.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Visit Dawat and discover why Bengali cuisine feels so familiar—yet exciting—at the same time.
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
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Share this article
                    </h3>
                  </div> */}

                  {/* Author Profile */}
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
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
                    <h3 className="font-heading text-xl font-semibold text-soft-white mb-3">
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
      {/* <Footer /> */}
    </div>
  );
};

export default TasteOfBengalInItaly;
