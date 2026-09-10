import { useNavigate } from "react-router-dom";
import { MapPin, Package } from "lucide-react";

export default function SchoolCard({ school }) {
  const navigate = useNavigate();

  const initials = school.shortName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      onClick={() => navigate(`/school/${school.id}`)}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
    >
      {/* Color banner */}
      <div
        className="h-20 flex items-center justify-center relative"
        style={{ backgroundColor: school.accent }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3), transparent 70%)`,
          }}
        />
        <span className="relative text-white text-3xl font-black tracking-tight">
          {initials}
        </span>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[--accent] transition-colors">
          {school.name}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
          <MapPin size={11} />
          <span className="truncate">{school.location}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs font-medium" style={{ color: school.accent }}>
          <Package size={12} />
          <span>{school.totalProducts} uniform items</span>
        </div>
      </div>
    </button>
  );
}
