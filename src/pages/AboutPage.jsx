import { Helmet } from 'react-helmet-async';
import Navbar from "../components/layout/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Helmet><title>About Us — Mayank Uniforms</title></Helmet>
      <Navbar showBack title="About Us" />

      <div className="max-w-3xl mx-auto px-4 pt-16 page-enter">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          Equipping students for success,{" "}
          <span className="text-[var(--accent)]">one uniform at a time.</span>
        </h1>

        <div className="space-y-6 text-gray-600 dark:text-white/70 text-base leading-relaxed">
          <p>
            Mayank Uniforms has been Jagadhri's trusted school uniform shop for years. We started with a simple goal — so parents don't have to run across the city hunting for the right uniform before school starts.
          </p>
          <p>
            We're the official uniform partner for schools across Jagadhri and Yamunanagar, working directly with school administrations to make sure every item matches the official guidelines — right colour, right cut, right badge.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-10">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Locally Made</h3>
              <p className="text-sm">Every uniform is stitched locally, ensuring quality control and fast restocking throughout the school year.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">School Approved</h3>
              <p className="text-sm">We coordinate directly with school offices so you never have to second-guess whether you're buying the right thing.</p>
            </div>
          </div>

          <p>
            Whether it's the first day of nursery or the final year of class 12, we've got you covered. Visit us at Civil Lines, Jagadhri — opposite Smart Point and Punjab National Bank.
          </p>
        </div>
      </div>
    </div>
  );
}
