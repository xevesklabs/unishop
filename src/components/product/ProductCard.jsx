import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useToastStore from "../../store/toastStore";
import { schools } from "../../data/mockData";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const school = schools.find((s) => s.id === product.schoolId);
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const firstAvailableSize = Object.entries(product.stock).find(
    ([, qty]) => qty > 0
  )?.[0];

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!firstAvailableSize) return;
    addItem(product, firstAvailableSize);
    showToast(`Added to bag — Size ${firstAvailableSize}`);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* Image area */}
      <div className="relative w-full aspect-square rounded-2xl mb-3 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Accent color dot */}
        <div
          className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full shadow-sm"
          style={{ backgroundColor: school?.accent || "var(--accent)" }}
        />
        {totalStock === 0 ? (
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 flex items-center justify-center">
            <span className="text-xs text-gray-800 dark:text-white/60 font-medium">Sold Out</span>
          </div>
        ) : (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 right-2 p-2 rounded-full text-white bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all shadow-sm active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        )}
      </div>

      {/* Info */}
      <p className="text-xs text-gray-400 dark:text-white/40 mb-0.5 truncate">{school?.shortName}</p>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-snug line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        <div className="flex items-center gap-0.5">
          <Star size={10} fill="#f59e0b" className="text-amber-400" />
          <span className="text-[10px] text-gray-500 dark:text-white/40">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
