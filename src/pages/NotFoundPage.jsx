import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors flex flex-col">
      <Navbar showBack title="Page Not Found" />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-card max-w-sm w-full p-8 rounded-3xl text-center shadow-lg dark:shadow-none border border-gray-100 dark:border-white/10">
          <h1 className="text-8xl font-black mb-2" style={{ color: "var(--accent)" }}>
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            This page doesn't exist
          </h2>
          <p className="text-sm text-gray-500 dark:text-white/50 mb-8">
            The page you're looking for might have been moved or deleted.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-md active:scale-95 transition-all"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Go Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 active:scale-95 transition-all"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
