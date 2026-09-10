import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCard";
import { products } from "../data/mockData";

export default function FeaturedProductsPage() {
  // Mock featured products (slice 8 to 16)
  const featuredProducts = products.slice(8, 16);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] transition-colors pb-20">
      <Navbar showBack title="Featured Products" />
      <div className="max-w-7xl mx-auto px-4 pt-10 page-enter">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8">Featured Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
