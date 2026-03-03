"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import Link from "next/link";

import blog1 from '@/assets/blog-n-1-1.png';
import blog2 from '@/assets/blog-n-2.png';
import blog3 from '@/assets/blog-n-3.png';

const blogs = [
  {
    id: 1,
    title: 'A Taste of Bengal in Italy: How Bengali Cuisine Fits the Italian Palate',
    excerpt: 'What happens when Bengal’s bold aromas meet Italy’s love for comfort and tradition? At Dawat, we believe Bengali cuisine doesn’t just belong in Italy..',
    image: blog1,
    date: 'January 15, 2026',
    category: 'Culture & Cuisine',
    slug: '/blog/taste-bengal-italy',
  },
  {
    id: 2,
    title: 'Must-Try Bengali Dishes for First-Time Guests in Our Restaurant',
    excerpt: 'Visiting a Bengali restaurant for the first time can be exciting—and a little overwhelming. With rich aromas, unique spices,',
    image: blog2,
    date: 'January 10, 2026',
    category: 'Food Guide',
    slug: '/blog/must-try-bengali-dish',
  },
  {
    id: 3,
    title: 'Bengali vs Indian Cuisine: What’s the Difference?',
    excerpt: 'Many people in Italy are familiar with “Indian food” — but few realize how diverse it truly is. Bengali cuisine, from the eastern part of the Indian subcontinent, has its own identity, flavors, and',
    image: blog3,
    date: 'January 5, 2026',
    category: 'Food Culture',
    slug: '/blog/benali-vs-indian-cuisine',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-10  bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Our Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our collection of recipes, cooking tips, and stories from the heart of Italian cuisine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image.src}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={blog.slug}
                    className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-300"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default BlogIndex;
