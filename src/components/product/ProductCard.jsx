import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import StockBadge from "./StockBadge";
import useCartStore from "../../store/cartStore";
import useToastStore from "../../store/toastStore";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const firstAvailableSize = Object.entries(product.stock).find(
    ([, qty]) => qty > 0
  )?.[0];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!firstAvailableSize) return;
    addItem(product, firstAvailableSize);
    showToast("Added to bag");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="h-40 flex items-center justify-center relative bg-gray-50 dark:bg-black overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <StockBadge stock={totalStock} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} fill="currentColor" className="text-amber-400" />
          <span className="text-xs text-gray-500 dark:text-white/50">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-sm" style={{ color: "var(--accent)" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleQuickAdd}
            disabled={totalStock === 0}
            className="p-1.5 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-90 transition-transform"
            style={{ backgroundColor: "var(--accent)" }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
