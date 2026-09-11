import { X, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    closeCart();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`cart-drawer fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-[#0e0e0e] shadow-2xl z-50 flex flex-col ${
          isOpen ? "open" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gray-700 dark:text-white/70" />
            <h2 className="font-bold text-gray-800 dark:text-white/90">
              Your Cart{" "}
              {items.length > 0 && (
                <span className="text-gray-400 dark:text-white/40 font-normal text-sm">
                  ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-white/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-400 dark:text-white/40">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-sm font-medium accent-text underline underline-offset-2"
                style={{ color: "var(--accent)" }}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex items-start gap-3 pb-4 border-b border-gray-50 dark:border-white/5 last:border-0"
              >
                {/* Product Image or Fallback */}
                {item.image ? (
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      loading="lazy"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.85 }}
                  >
                    {item.size}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">
                    Size: {item.size}
                  </p>
                  <p className="text-sm font-bold mt-1" style={{ color: "var(--accent)" }}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-5 text-center dark:text-white/90">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.key)}
                  className="p-1.5 text-gray-400 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full mt-0.5"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#151515] space-y-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-white/60">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900 dark:text-white/90">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-white/40">
              Delivery charges calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-md active:scale-95"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
