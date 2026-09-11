import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Home } from "lucide-react";
import Navbar from "../components/layout/Navbar";

function generateOrderId() {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UNI-${ymd}-${rand}`;
}

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const [orderId] = useState(generateOrderId);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] flex flex-col transition-colors">
      <Navbar title="Order Placed" />

      <div className="max-w-sm mx-auto px-5 py-12 text-center page-enter">

        {/* Animated checkmark */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl ${show ? "check-circle" : "opacity-0"}`}
          style={{ backgroundColor: "var(--accent)" }}
        >
          ✓
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">Order Confirmed!</h1>
        <p className="text-sm text-gray-500 dark:text-white/40 mt-2">
          Thank you! Your uniforms are on their way. A confirmation email has been sent to you.
        </p>

        {/* Order ID card */}
        <div className="mt-6 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
          <p className="text-lg font-black tracking-wide" style={{ color: "var(--accent)" }}>
            {orderId}
          </p>
          <p className="text-xs text-gray-500 dark:text-white/40 mt-2">
            Save this ID for tracking and returns
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-6 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-4 text-left">
          <p className="text-xs font-bold text-gray-700 mb-3">What happens next?</p>
          {[
            { step: "Order Received",    time: "Now",          done: true },
            { step: "Processing",        time: "Today",        done: false },
            { step: "Out for Delivery",  time: "2–4 days",     done: false },
            { step: "Delivered",         time: "3–5 days",     done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                style={{ backgroundColor: item.done ? "var(--accent)" : "#e2e8f0" }}
              >
                {item.done ? "✓" : i + 1}
              </div>
              <div className="flex-1 flex justify-between">
                <p className={`text-xs font-medium ${item.done ? "text-gray-900" : "text-gray-400"}`}>
                  {item.step}
                </p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Home size={15} />
            Continue Shopping
          </button>
          <button
            onClick={() => window.open('https://wa.me/919466210650?text=Hi%2C%20I%20want%20to%20track%20my%20order', '_blank')}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={15} />
            Track via WhatsApp
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Need help? WhatsApp us at{" "}
          <a href="https://wa.me/919466210650" className="underline font-medium" style={{ color: "var(--accent)" }}>
            +91 94662 10650
          </a>
        </p>
      </div>
    </div>
  );
}
