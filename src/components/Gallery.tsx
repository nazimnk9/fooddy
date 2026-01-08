import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1482049016gy-23fc1f7da90d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop",
];

export const Gallery = () => {
  return (
    <section className="py-0 overflow-hidden">
      <div className="grid grid-cols-4 md:grid-cols-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-square overflow-hidden group cursor-pointer"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
