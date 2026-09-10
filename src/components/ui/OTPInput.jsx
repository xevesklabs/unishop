import { useEffect, useRef } from "react";

export default function OTPInput({ value, onChange, length = 6 }) {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = value.split("");
    newOtp[index] = val;
    onChange(newOtp.join(""));
    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted.padEnd(length, "").slice(0, length));
    if (pasted.length > 0) {
      inputs.current[Math.min(pasted.length, length - 1)]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none transition-colors"
          style={{
            borderColor: value[i] ? "var(--accent)" : "#e2e8f0",
            color: "var(--accent)",
          }}
        />
      ))}
    </div>
  );
}
