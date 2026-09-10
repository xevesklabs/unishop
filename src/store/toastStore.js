import { create } from "zustand";

const useToastStore = create((set) => ({
  message: null,
  isVisible: false,
  timeoutId: null,

  showToast: (msg) => {
    set((state) => {
      if (state.timeoutId) clearTimeout(state.timeoutId);
      const newTimeoutId = setTimeout(() => {
        set({ isVisible: false });
      }, 3000);
      return { message: msg, isVisible: true, timeoutId: newTimeoutId };
    });
  },
}));

export default useToastStore;
