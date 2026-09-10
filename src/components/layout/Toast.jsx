import useToastStore from "../../store/toastStore";
import { CheckCircle2 } from "lucide-react";

export default function Toast() {
  const { message, isVisible } = useToastStore();

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium">
        <CheckCircle2 size={18} className="text-emerald-400 dark:text-emerald-600" />
        {message}
      </div>
    </div>
  );
}
