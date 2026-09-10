import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCard";
import { products } from "../data/mockData";

export default function NewArrivalsPage() {
  // Mock new arrivals (first 8)
  const newArrivals = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Navbar showBack title="New Arrivals" />
      <div className="max-w-7xl mx-auto px-4 pt-10 page-enter">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">New Arrivals</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
