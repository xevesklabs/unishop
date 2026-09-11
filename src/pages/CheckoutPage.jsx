import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Banknote, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import useCartStore from "../store/cartStore";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", address: "", city: "", pin: "", phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim())    errs.city    = "City is required";
    if (!/^\d{6}$/.test(form.pin)) errs.pin = "Enter a valid 6-digit PIN code";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit phone number";
    return errs;
  };

  const handlePlaceOrder = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate("/order-confirm");
    }, 1500);
  };

  const fields = [
    { name: "name",    label: "Full Name",         placeholder: "Ramesh Kumar",         type: "text" },
    { name: "address", label: "Delivery Address",  placeholder: "Flat 3B, Sunshine Apts, MG Road", type: "text" },
    { name: "city",    label: "City",              placeholder: "Jagadhri",             type: "text" },
    { name: "pin",     label: "PIN Code",          placeholder: "135003",                type: "tel" },
    { name: "phone",   label: "Phone Number",      placeholder: "9876543210",            type: "tel" },
  ];

  const deliveryFee = total >= 999 ? 0 : 60;
  const grandTotal  = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors flex flex-col">
      <Helmet><title>Checkout — Mayank Uniforms</title></Helmet>
        <Navbar showBack title="Checkout" />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-gray-500 dark:text-white/40 dark:text-white/50 mb-4">Your cart is empty — add items before checking out</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md active:scale-95 transition-all"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors">
      <Navbar showBack title="Checkout" />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 page-enter">

        {/* Delivery address */}
        <section className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-white/10 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white/90 flex items-center gap-2 mb-4">
            <MapPin size={15} style={{ color: "var(--accent)" }} />
            Delivery Address
          </h2>
          <div className="space-y-3">
            {fields.map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-gray-600 dark:text-white/60 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 bg-gray-50 dark:bg-[#0e0e0e]"
                  style={{
                    borderColor: errors[name] ? "#ef4444" : "#e2e8f0",
                    "--tw-ring-color": "var(--accent)",
                  }}
                />
                {errors[name] && (
                  <p className="text-xs text-red-500 mt-0.5">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Payment method */}
        <section className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-white/10 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white/90 flex items-center gap-2 mb-4">
            <CreditCard size={15} style={{ color: "var(--accent)" }} />
            Payment Method
          </h2>
          <div className="space-y-2">
            {[
              {
                id: "online",
                icon: <CreditCard size={16} />,
                title: "Pay Online",
                sub: "UPI, Cards, Net Banking via Razorpay",
              },
              {
                id: "cod",
                icon: <Banknote size={16} />,
                title: "Cash on Delivery",
                sub: "Pay when your order arrives",
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                style={{
                  borderColor:
                    paymentMethod === opt.id ? "var(--accent)" : "#e2e8f0",
                  backgroundColor:
                    paymentMethod === opt.id ? "var(--accent-light)" : "white",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.id}
                  checked={paymentMethod === opt.id}
                  onChange={() => setPaymentMethod(opt.id)}
                  className="mt-0.5"
                  style={{ accentColor: "var(--accent)" }}
                />
                <span style={{ color: "var(--accent)" }}>{opt.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{opt.title}</p>
                  <p className="text-xs text-gray-500 dark:text-white/40">{opt.sub}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Order summary */}
        <section className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 border border-gray-100 dark:border-white/10 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white/90 mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between text-gray-600 dark:text-white/60">
                <span className="truncate max-w-[200px]">
                  {item.name}{" "}
                  <span className="text-gray-400">
                    ({item.size}) ×{item.quantity}
                  </span>
                </span>
                <span className="font-medium text-gray-800 dark:text-white/90 flex-shrink-0 ml-2">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 dark:border-white/10 pt-2 flex justify-between text-gray-600 dark:text-white/60">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
            {deliveryFee === 0 && (
              <p className="text-xs text-emerald-600">🎉 Free delivery on orders above ₹999</p>
            )}
            <div className="flex justify-between font-bold text-gray-900 text-base pt-1">
              <span>Total</span>
              <span style={{ color: "var(--accent)" }}>
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </section>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Placing order…</>
          ) : (
            `Place Order — ₹${grandTotal.toLocaleString("en-IN")} →`
          )}
        </button>
      </div>
    </div>
  );
}
