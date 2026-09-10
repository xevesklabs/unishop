import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size, quantity = 1) => {
        const key = `${product.id}-${size}`;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isOpen: true,
          }));
        } else {
          set((s) => ({
            items: [
              ...s.items,
              {
                key,
                productId: product.id,
                schoolId: product.schoolId,
                name: product.name,
                size,
                price: product.price,
                quantity,
              },
            ],
            isOpen: true,
          }));
        }
      },

      removeItem: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "uniform-cart" }
  )
);

export default useCartStore;
