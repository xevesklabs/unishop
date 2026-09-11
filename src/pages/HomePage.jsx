import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { schools, products } from "../data/mockData";
import ProductCard from "../components/product/ProductCard";

// ── Category data ──────────────────────────────────────────────────────────
const shopCategories = [
  { id: "boys",        label: "Boys",        emoji: "👦", desc: "Shirts, trousers & more" },
  { id: "girls",       label: "Girls",       emoji: "👧", desc: "Blouses, skirts & more" },
  { id: "winter",      label: "Winter",      emoji: "🧥", desc: "Sweaters, blazers & jackets" },
  { id: "summer",      label: "Summer",      emoji: "☀️", desc: "Light & breathable uniforms" },
  { id: "sportswear",  label: "Sportswear",  emoji: "🏃", desc: "PT kits & track gear" },
  { id: "accessories", label: "Accessories", emoji: "🎀", desc: "Ties, belts & badges" },
];

// ── New arrivals = first 8 products ───────────────────────────────────────
const newArrivals = products.slice(0, 8);

// ── Stat data ─────────────────────────────────────────────────────────────
const stats = [
  { value: "4+",  label: "Partner Schools" },
  { value: "28+", label: "Uniform Items" },
  { value: "2–4", label: "Days Delivery" },
  { value: "100%", label: "School Approved" },
];

// ── School card (Theme-aware version) ────────────────────────────────────────────
function ThemeSchoolCard({ school }) {
  const navigate = useNavigate();
  const initials = school.shortName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      onClick={() => navigate(`/school/${school.id}`)}
      className="group glass-card rounded-2xl p-5 cursor-pointer hover:border-gray-200 dark:hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0 w-52 md:w-60"
    >
      {/* Color swatch */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg mb-4 relative overflow-hidden shadow-sm"
        style={{ backgroundColor: school.accent }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 60%)" }} />
        <span className="relative">{initials}</span>
      </div>

      <h3 className="font-bold text-gray-800 dark:text-white/90 text-sm leading-snug mb-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {school.name}
      </h3>
      <p className="text-xs text-gray-500 dark:text-white/40 mb-3">{school.location}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: school.accent }}>
          {school.totalProducts} items
        </span>
        <ArrowRight size={13} className="text-gray-300 dark:text-white/30 group-hover:text-gray-500 dark:group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors">
      <Helmet><title>Mayank Uniforms — School Uniforms in Jagadhri & Yamunanagar</title><meta name="description" content="Mayank Uniforms is Jagadhri's trusted school uniform shop. Buy official uniforms for your school online — delivered across Jagadhri & Yamunanagar." /></Helmet>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 hero-glow">
        {/* Background grid lines */}
        <div className="absolute inset-0 grid-overlay opacity-[0.4] dark:opacity-100" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-white/60 mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Official Uniform Partner · Jagadhri
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.08] tracking-tight mb-5">
            Find Your School's
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, var(--accent), #818cf8)` }}
            >
              Official Uniforms
            </span>
          </h1>

          <p className="text-base text-gray-600 dark:text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
            Browse, select your size, and get the exact uniform your school requires — delivered to your door in 2–4 days.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
            <input
              type="text"
              id="hero-search"
              placeholder="Search your school…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors"
            />
          </div>

          {/* Quick school pills (filtered) */}
          {query && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {filteredSchools.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/school/${s.id}`)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors border shadow-sm"
                  style={{ backgroundColor: s.accent + "10", borderColor: s.accent + "40" }}
                >
                  {s.name}
                </button>
              ))}
              {filteredSchools.length === 0 && (
                <p className="text-xs text-gray-500 dark:text-white/30">No schools found for "{query}"</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ─────────────────────────────────────────────── */}
      <section className="border-t border-gray-200 dark:border-white/6 py-14 px-4 bg-white/30 dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-1">Browse</p>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Shop by Category</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-2">
              Find exactly what you need across all uniform types
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {shopCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.id}`)}
                className="glass-card rounded-2xl p-4 text-left group hover:border-gray-300 dark:hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200 shadow-sm dark:shadow-none"
              >
                <span className="text-3xl mb-3 block">{cat.emoji}</span>
                <p className="text-sm font-bold text-gray-800 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {cat.label}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-white/35 mt-0.5 leading-snug">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERED SCHOOLS ────────────────────────────────────────────── */}
      <section className="border-t border-gray-200 dark:border-white/6 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-1">
                Official Partners
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Partnered Schools</h2>
            </div>
            <button
              onClick={() => navigate('/schools')}
              className="text-xs font-semibold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              View all <ArrowRight size={13} />
            </button>
          </div>

          <div className="scroll-row-wrapper"><div className="scroll-row flex gap-4 pb-2">
            {schools.map((school) => (
              <ThemeSchoolCard key={school.id} school={school} />
            ))}
          </div></div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-1">
              Just In
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">New Arrivals</h2>
          </div>
          <button
            onClick={() => navigate('/new-arrivals')}
            className="text-xs font-semibold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            View all <ArrowRight size={13} />
          </button>
        </div>

        <div className="scroll-row-wrapper"><div className="scroll-row flex gap-4 pb-2">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div></div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-200 dark:border-white/6 bg-white/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="py-6 px-4 text-center border-r border-gray-200 dark:border-white/6 last:border-0"
              >
                <p className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-white/6 bg-white dark:bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  M
                </div>
                <span className="font-bold text-gray-900 dark:text-white">Mayank Uniforms</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-white/40 leading-relaxed mb-4">
                School uniforms for Jagadhri & Yamunanagar. Quality uniforms, fast delivery.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white/40 mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                <li><Link to="/" className="text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/schools" className="text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">Schools</Link></li>
                <li><Link to="/products" className="text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/about" className="text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/about" className="text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">Our Policies</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white/40 mb-4">Social</h4>
              <ul className="space-y-2.5 mb-6">
                <li>
                  <a href="https://instagram.com/mayank.uniforms" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <span>📸</span> @mayank.uniforms
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white/40 mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/50">
                  <span className="mt-0.5">📍</span>
                  <span>Civil Lines, Jagadhri — Opp. Smart Point & PNB</span>
                </li>
                <li>
                  <a
                    href="https://wa.me/919466210650"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span>💬</span> +91 94662 10650
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50">
                  <span>📞</span> +91 80590 68794
                </li>
                <li>
                  <a
                    href="mailto:uniformmayank@gmail.com"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span>✉️</span> uniformmayank@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-white/25">
            <p>© 2025 Mayank Uniforms. All rights reserved.</p>
            <p>Serving Jagadhri & Yamunanagar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}