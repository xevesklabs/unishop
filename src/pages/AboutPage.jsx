import Navbar from "../components/layout/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Navbar title="About Us" />

      <div className="max-w-3xl mx-auto px-4 pt-16 page-enter">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          Equipping students for success,{" "}
          <span className="text-[var(--accent)]">one uniform at a time.</span>
        </h1>

        <div className="space-y-6 text-gray-600 dark:text-white/70 text-base leading-relaxed">
          <p>
            UniShop was founded on a simple premise: parents shouldn't have to spend their weekends hunting across crowded local markets to find the right school uniform.
          </p>
          <p>
            As the official uniform partner for over a dozen premier schools in the New Delhi region, we work directly with school administrations to guarantee that every stitch, color, and badge perfectly matches official guidelines.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-10">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Premium Fabrics</h3>
              <p className="text-sm">Breathable cotton blends for Delhi summers, and warm woolen knits for the winters. Quality that lasts all year.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Community First</h3>
              <p className="text-sm">We employ local artisans and tailors, ensuring fair wages while keeping traditional craftsmanship alive.</p>
            </div>
          </div>

          <p>
            Whether it's the first day of kindergarten or the final year of high school, we're here to ensure your child steps into the classroom looking smart and feeling confident.
          </p>
        </div>
      </div>
    </div>
  );
}
