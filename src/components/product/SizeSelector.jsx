export default function SizeSelector({ sizes, stock, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const qty = stock[size] ?? 0;
        const isOut = qty === 0;
        const isSelected = selected === size;

        return (
          <button
            key={size}
            onClick={() => !isOut && onChange(size)}
            disabled={isOut}
            className={`
              px-3 py-1.5 rounded-lg border text-sm font-medium transition-all
              ${isSelected
                ? "text-white border-transparent shadow-sm"
                : isOut
                ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed line-through"
                : "border-gray-200 text-gray-700 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }
            `}
            style={
              isSelected
                ? { backgroundColor: "var(--accent)", borderColor: "var(--accent)" }
                : {}
            }
            title={isOut ? "Out of stock" : `${qty} in stock`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
