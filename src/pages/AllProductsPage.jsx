import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCard";
import { products, schools } from "../data/mockData";

export default function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedSchool, setSelectedSchool] = useState("all");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = ["all", "boys", "girls", "winter", "summer", "sportswear", "accessories"];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.tags.includes(selectedCategory);
    const matchSchool = selectedSchool === "all" || p.schoolId === selectedSchool;
    return matchCategory && matchSchool;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Navbar showBack title="All Products" />
      <div className="max-w-7xl mx-auto px-4 pt-10 page-enter">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-sm text-gray-800 dark:text-white outline-none focus:border-[var(--accent)]"
          >
            <option value="all">All Schools</option>
            {schools.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <div className="flex gap-2 overflow-x-auto pb-2 scroll-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-white/40">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
