import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import blog1 from '@/assets/blog-n-1.png';
import blog2 from '@/assets/blog-n-2.png';
import blog3 from '@/assets/blog-n-3.png';
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: 'A Taste of Bengal in Italy: How Bengali Cuisine Fits the Italian Palate',
    excerpt: 'What happens when Bengal’s bold aromas meet Italy’s love for comfort and tradition? At Dawat, we believe Bengali cuisine doesn’t just belong in Italy..',
    image: blog1,
    date: 'January 15, 2026',
    category: 'Culture & Cuisine',
    link: '/blog/taste-bengal-italy'
  },
  {
    id: 2,
    title: 'Must-Try Bengali Dishes for First-Time Guests in Our Restaurant',
    excerpt: 'Visiting a Bengali restaurant for the first time can be exciting—and a little overwhelming. With rich aromas, unique spices,',
    image: blog2,
    date: 'January 10, 2026',
    category: 'Food Guide',
    link: '/blog/must-try-bengali-dish'
  },
  {
    id: 3,
    title: 'Bengali vs Indian Cuisine: What’s the Difference?',
    excerpt: 'Many people in Italy are familiar with “Indian food” — but few realize how diverse it truly is. Bengali cuisine, from the eastern part of the Indian subcontinent, has its own identity, flavors, and traditions that set it apart.',
    image: blog3,
    date: 'January 5, 2026',
    category: 'Food Culture',
    link: '/blog/benali-vs-indian-cuisine'
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

const BlogSection = () => {
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
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From Our Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest news, recipes, and culinary insights
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
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
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <a
                  href= {blog.link}
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
          <Button variant="outline" size="lg" className="gap-2">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Button>
          </Link>
          
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
