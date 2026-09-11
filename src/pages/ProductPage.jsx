import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, ChevronDown, ChevronUp, ShoppingCart, Shield } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import SizeSelector from "../components/product/SizeSelector";
import StockBadge from "../components/product/StockBadge";
import { getProductById, getSchoolById } from "../data/mockData";
import useCartStore from "../store/cartStore";

import useToastStore from "../store/toastStore";

const SIZE_CHART = {
  S:  { chest: "34–36", waist: "28–30", length: "27" },
  M:  { chest: "38–40", waist: "32–34", length: "28" },
  L:  { chest: "42–44", waist: "36–38", length: "29" },
  XL: { chest: "46–48", waist: "40–42", length: "30" },
};

export default function ProductPage() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const product = getProductById(productId);
  const school   = product ? getSchoolById(product.schoolId) : null;

  // Apply theme
  useEffect(() => {
    if (!school) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", school.accent);
    root.style.setProperty("--accent-light", school.accentLight);
    return () => {
      root.style.setProperty("--accent", "#1a3c6e");
      root.style.setProperty("--accent-light", "rgba(26,60,110,0.09)");
    };
  }, [school]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
      <Helmet><title>{product.name} | {school.shortName} — Mayank Uniforms</title></Helmet>
        Product not found.
      </div>
    );
  }

  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    showToast("Added to bag");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const hasSizeChart = product.sizes.some((s) => SIZE_CHART[s]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] pb-28 transition-colors">
      <Navbar showBack title={school?.shortName} />

      {/* Image hero */}
      <div className="w-full h-56 relative bg-gray-100 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-3 right-3">
          <StockBadge stock={totalStock} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 page-enter">

        {/* Title & price */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-1">
            {school?.name}
          </p>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                  className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>
          <p className="text-2xl font-black mt-2" style={{ color: "var(--accent)" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{product.description}</p>

        {/* Size selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-800">
              Select Size{" "}
              {!selectedSize && (
                <span className="text-red-400 font-normal text-xs ml-1">
                  (required)
                </span>
              )}
            </p>
            {hasSizeChart && (
              <button
                onClick={() => setShowChart(!showChart)}
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Size Guide
                {showChart ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            )}
          </div>

          <SizeSelector
            sizes={product.sizes}
            stock={product.stock}
            selected={selectedSize}
            onChange={setSelectedSize}
          />

          {/* Size chart accordion */}
          {showChart && hasSizeChart && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "var(--accent)" }}>
                    <th className="py-2 px-3 text-left text-white font-semibold">Size</th>
                    <th className="py-2 px-3 text-white font-semibold">Chest (in)</th>
                    <th className="py-2 px-3 text-white font-semibold">Waist (in)</th>
                    <th className="py-2 px-3 text-white font-semibold">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(SIZE_CHART).map(([size, vals], i) => (
                    <tr key={size} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-1.5 px-3 font-bold" style={{ color: "var(--accent)" }}>{size}</td>
                      <td className="py-1.5 px-3 text-center text-gray-600">{vals.chest}</td>
                      <td className="py-1.5 px-3 text-center text-gray-600">{vals.waist}</td>
                      <td className="py-1.5 px-3 text-center text-gray-600">{vals.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex gap-3">
          {[
            { icon: "🚚", label: "Free delivery above ₹999" },
            { icon: "↩️", label: "Easy 7-day returns" },
            { icon: "✅", label: "School-approved quality" },
          ].map((b) => (
            <div key={b.label} className="flex-1 rounded-xl bg-white border border-gray-100 p-2.5 text-center">
              <p className="text-base">{b.icon}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews preview */}
        <div>
          <h2 className="text-sm font-bold text-gray-800 mb-3">Customer Reviews</h2>
          {[
            { name: "Anjali M.", rating: 5, comment: "Perfect fit and great fabric quality. My son loves it!", date: "Aug 2026" },
            { name: "Rahul K.", rating: 4, comment: "Good product, delivery was fast. Sizing runs slightly large.", date: "Jul 2026" },
          ].map((r, i) => (
            <div key={i} className="py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {r.name[0]}
                </div>
                <span className="text-xs font-semibold text-gray-700">{r.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill={i < r.rating ? "#f59e0b" : "none"} className={i < r.rating ? "text-amber-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-xs text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Add to Cart bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 z-30 shadow-lg">
        <div className="text-left">
          <p className="text-xs text-gray-400">Total</p>
          <p className="font-black text-lg" style={{ color: "var(--accent)" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || totalStock === 0}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {added ? (
            "✓ Added to Cart!"
          ) : (
            <>
              <ShoppingCart size={16} />
              {!selectedSize ? "Select a size first" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
