import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { schools } from "../data/mockData";

export default function AllSchoolsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Navbar showBack title="Partnered Schools" />
      <div className="max-w-7xl mx-auto px-4 pt-10 page-enter">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">Partnered Schools</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {schools.map((school) => {
            const initials = school.shortName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div
                key={school.id}
                onClick={() => navigate(`/school/${school.id}`)}
                className="group glass-card rounded-2xl p-6 cursor-pointer hover:border-gray-300 dark:hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-xl mb-5 relative overflow-hidden shadow-sm"
                  style={{ backgroundColor: school.accent }}
                >
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 60%)" }} />
                  <span className="relative">{initials}</span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white/90 text-base leading-snug mb-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {school.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-white/40 mb-4">{school.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: school.accent }}>
                    {school.totalProducts} items
                  </span>
                  <ArrowRight size={14} className="text-gray-300 dark:text-white/30 group-hover:text-gray-500 dark:group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
