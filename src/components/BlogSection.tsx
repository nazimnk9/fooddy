import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import blog1 from '@/assets/blog-1.jpg';
import blog2 from '@/assets/blog-2.jpg';
import blog3 from '@/assets/blog-3.jpg';

const blogs = [
  {
    id: 1,
    title: 'The Art of Fresh Pasta Making',
    excerpt: 'Discover the secrets behind our handmade pasta and traditional techniques passed down through generations.',
    image: blog1,
    date: 'January 15, 2026',
    category: 'Recipes',
  },
  {
    id: 2,
    title: 'Perfect Wine Pairing Guide',
    excerpt: 'Learn how to pair Italian wines with your favorite dishes for an unforgettable dining experience.',
    image: blog2,
    date: 'January 10, 2026',
    category: 'Wine',
  },
  {
    id: 3,
    title: 'Fresh Ingredients: Farm to Table',
    excerpt: 'We take pride in sourcing the freshest ingredients from local farms and importing the finest Italian products.',
    image: blog3,
    date: 'January 5, 2026',
    category: 'Quality',
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
                  href="#"
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
          <Button variant="outline" size="lg" className="gap-2">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
