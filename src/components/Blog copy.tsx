import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "10 Best Pizza Places in the City",
    excerpt:
      "Discover the top pizza spots that locals love and tourists rave about...",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
    date: "Jan 5, 2024",
    comments: 12,
    category: "Food Guide",
  },
  {
    title: "How to Make Perfect Sushi at Home",
    excerpt:
      "Master the art of sushi making with these simple tips from professional chefs...",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop",
    date: "Jan 3, 2024",
    comments: 8,
    category: "Recipes",
  },
  {
    title: "The Rise of Plant-Based Burgers",
    excerpt:
      "Exploring the growing trend of vegetarian and vegan burger options...",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    date: "Dec 28, 2023",
    comments: 15,
    category: "Trends",
  },
];

export const Blog = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container-fooddy">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Latest News
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            From Our Blog
          </motion.h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-fixed group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
