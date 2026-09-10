import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartDrawer from "./components/layout/CartDrawer";
import Toast from "./components/layout/Toast";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SchoolPage from "./pages/SchoolPage";
import ProductPage from "./pages/ProductPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import FeaturedProductsPage from "./pages/FeaturedProductsPage";
import AllSchoolsPage from "./pages/AllSchoolsPage";
import AllProductsPage from "./pages/AllProductsPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import useThemeStore from "./store/themeStore";

export default function App() {
  const { isDark, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme(isDark);
  }, [isDark, initTheme]);

  return (
    <BrowserRouter>
      {/* Global cart drawer — always mounted */}
      <CartDrawer />
      <Toast />

      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/about"          element={<AboutPage />} />
        <Route path="/new-arrivals"   element={<NewArrivalsPage />} />
        <Route path="/featured"       element={<FeaturedProductsPage />} />
        <Route path="/schools"        element={<AllSchoolsPage />} />
        <Route path="/products"       element={<AllProductsPage />} />
        <Route path="/school/:schoolId"  element={<SchoolPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/checkout"       element={<CheckoutPage />} />
        <Route path="/order-confirm"  element={<OrderConfirmPage />} />
        {/* Catch-all */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center text-gray-400 dark:bg-[#0e0e0e]">
            <div className="text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold text-gray-700 dark:text-white">Page not found</p>
              <a href="/" className="text-sm underline mt-2 block" style={{ color: "var(--accent)" }}>
                Go home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
