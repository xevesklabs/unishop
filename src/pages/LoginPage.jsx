import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import OTPInput from "../components/ui/OTPInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = contact, 2 = OTP
  const [mode, setMode] = useState("email"); // email | phone
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOTP = () => {
    if (!contact.trim()) {
      setError(`Please enter your ${mode === "email" ? "email address" : "phone number"}`);
      return;
    }
    setError("");
    setLoading(true);
    // Mock: simulate network delay
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(30);
    }, 1200);
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    setCountdown(30);
    // Mock resend logic
  };

  const handleVerifyOTP = () => {
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);
    // Mock: any 6-digit code works
    setTimeout(() => {
      setLoading(false);
      navigate("/checkout");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors flex flex-col">
      <Navbar showBack title="Sign In" />

      <div className="max-w-sm mx-auto px-5 py-10 page-enter">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white text-xl shadow-lg"
          style={{ backgroundColor: "var(--accent)" }}
        >
          🔐
        </div>

        {step === 1 ? (
          <>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white text-center">
              Verify Your Identity
            </h1>
            <p className="text-sm text-gray-500 dark:text-white/50 text-center mt-1 mb-6">
              We'll send you a one-time code to confirm your order.
            </p>

            {/* Toggle */}
            <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-1 mb-4">
              {["email", "phone"].map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setContact(""); setError(""); }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    mode === m 
                      ? "bg-white dark:bg-[#1a1a1a] shadow text-gray-900 dark:text-white" 
                      : "text-gray-500 dark:text-white/40"
                  }`}
                >
                  {m === "email" ? <Mail size={13} /> : <Phone size={13} />}
                  {m === "email" ? "Email" : "Phone"}
                </button>
              ))}
            </div>

            <input
              type={mode === "email" ? "email" : "tel"}
              placeholder={mode === "email" ? "you@example.com" : "+91 94662 10650"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 bg-white dark:bg-transparent text-gray-900 dark:text-white"
              style={{ "--tw-ring-color": "var(--accent)" }}
            />

            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 shadow-md active:scale-95 transition-all"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>Send OTP <ArrowRight size={15} /></>
              )}
            </button>

            <p className="text-xs text-gray-400 dark:text-white/30 text-center mt-4">
              By continuing, you agree to our Terms of Service. No password needed.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white text-center">
              Enter OTP
            </h1>
            <p className="text-sm text-gray-500 dark:text-white/50 text-center mt-1 mb-6">
              A 6-digit code was sent to{" "}
              <span className="font-semibold text-gray-700 dark:text-white/80">{contact}</span>
            </p>

            <OTPInput value={otp} onChange={setOtp} length={6} />

            {error && <p className="text-xs text-red-500 mt-3 text-center">{error}</p>}

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length < 6}
              className="w-full mt-5 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 shadow-md active:scale-95 transition-all"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Verify & Continue →"
              )}
            </button>

            <button
              onClick={() => { setStep(1); setOtp(""); setError(""); }}
              className="w-full mt-3 text-xs text-gray-400 dark:text-white/40 hover:underline"
            >
              ← Change {mode === "email" ? "email" : "number"}
            </button>

            <p className="text-xs text-gray-400 dark:text-white/40 text-center mt-2">
              Didn't get a code?{" "}
              <button
                className={`font-medium ${countdown === 0 ? "underline" : "opacity-60 cursor-not-allowed"}`}
                style={{ color: "var(--accent)" }}
                onClick={handleResendOTP}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
