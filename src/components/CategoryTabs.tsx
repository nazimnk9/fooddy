import { motion } from "framer-motion";
import { Category } from "@/services/menuService";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: number | "All";
  onCategoryChange: (categoryId: number | "All") => void;
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
      <button
        onClick={() => onCategoryChange("All")}
        className={`category-tab relative ${activeCategory === "All" ? "category-tab-active" : ""
          }`}
      >
        {activeCategory === "All" && (
          <motion.div
            layoutId="activeCategory"
            className="absolute inset-0 bg-accent rounded"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative z-10">All</span>
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`category-tab relative ${activeCategory === category.id ? "category-tab-active" : ""
            }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-accent rounded"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{category.title}</span>
        </button>
      ))}
    </div>
  );
};
