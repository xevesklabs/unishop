import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Menu, X, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import useCartStore from "../../store/cartStore";
import useThemeStore from "../../store/themeStore";

export default function Navbar({ showBack = false, title = "" }) {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchClick = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const searchInput = document.getElementById('hero-search');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 500);
      }
    } else {
      setMobileOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md bg-white/90 border-gray-200 text-gray-800 dark:bg-[#0e0e0e]/90 dark:border-white/10 dark:text-white transition-colors">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={19} />
            </button>
          )}
          {title ? (
            <span className="font-semibold text-sm truncate max-w-[200px]">
              {title}
            </span>
          ) : (
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "var(--accent)" }}
              >
                M
              </div>
              <span className="font-bold text-base tracking-tight">
                Mayank Uniforms
              </span>
            </Link>
          )}
        </div>

        {/* Center nav links — desktop */}
        {!showBack && (
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/schools", label: "Schools" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Search — desktop */}
          <button 
            onClick={handleSearchClick}
            className="hidden md:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 opacity-60 hover:opacity-100 transition-all"
          >
            <Search size={18} />
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Sign in — desktop */}
          <Link
            to="/login"
            className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white ml-1"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Sign In
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3 text-sm font-medium border-gray-100 dark:border-white/10 bg-white dark:bg-[#0e0e0e]">
          {[
            { to: "/", label: "Home" },
            { to: "/schools", label: "Schools" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" }
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="text-left opacity-70 hover:opacity-100 transition-opacity py-1"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
