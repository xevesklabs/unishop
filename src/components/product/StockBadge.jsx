export default function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="text-[10px] font-semibold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
        Out of Stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
        Low Stock
      </span>
    );
  }
  return (
    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
      In Stock
    </span>
  );
}
