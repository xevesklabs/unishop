import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false, // default: light mode
      toggleTheme: () =>
        set((s) => {
          const next = !s.isDark;
          document.documentElement.classList.toggle("dark", next);
          return { isDark: next };
        }),
      initTheme: (isDark) => {
        document.documentElement.classList.toggle("dark", isDark);
      },
    }),
    { name: "uni-theme" }
  )
);

export default useThemeStore;
