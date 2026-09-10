import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCard";
import { getSchoolById, getProductsBySchool, categories } from "../data/mockData";

export default function SchoolPage() {
  const { schoolId } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");

  const school = getSchoolById(schoolId);
  const allProducts = getProductsBySchool(schoolId);

  // Apply ambient theme
  useEffect(() => {
    if (!school) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", school.accent);
    root.style.setProperty("--accent-light", school.accentLight);
    root.style.setProperty("--accent-btn", school.accentBtn);
    root.style.setProperty("--accent-text", school.accentText);
    return () => {
      // Reset on unmount
      root.style.setProperty("--accent", "#1a3c6e");
      root.style.setProperty("--accent-light", "rgba(26,60,110,0.09)");
      root.style.setProperty("--accent-btn", "#1a3c6e");
      root.style.setProperty("--accent-text", "#ffffff");
    };
  }, [school]);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>School not found.</p>
      </div>
    );
  }

  const filtered =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter(
          (p) =>
            p.category === activeCategory ||
            p.season === activeCategory ||
            p.tags?.includes(activeCategory)
        );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors">
      <Navbar showBack title={school.name} />

      {/* School hero banner */}
      <div
        className="relative h-28 flex items-center px-5 overflow-hidden"
        style={{ backgroundColor: school.accent }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15), transparent 60%)`,
          }}
        />
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl font-black mb-1">
            {school.shortName.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="text-white font-extrabold text-lg leading-tight">
            {school.name}
          </h1>
          <p className="text-white/70 text-xs mt-0.5">
            {allProducts.length} uniform items available
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div
        className="sticky top-14 z-30 bg-white dark:bg-[#0e0e0e] border-b border-gray-100 dark:border-white/10 px-4 py-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? allProducts.length
                : allProducts.filter(
                    (p) =>
                      p.category === cat.id ||
                      p.season === cat.id ||
                      p.tags?.includes(cat.id)
                  ).length;
            if (count === 0 && cat.id !== "all") return null;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: "var(--accent)" }
                    : {}
                }
              >
                {cat.label}
                {cat.id !== "all" && count > 0 && (
                  <span className="ml-1 opacity-70">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product grid */}
      <section className="max-w-5xl mx-auto px-4 py-5 page-enter">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No items in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
