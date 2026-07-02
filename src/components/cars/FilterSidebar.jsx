import { HiOutlineXMark } from "react-icons/hi2";
import { CATEGORIES } from "../../constants";
import { formatPrice } from "../../utils/formatters";

const TRANSMISSIONS = ["Automatic", "Manual"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

function FilterSection({ title, children }) {
  return (
    <div className="py-6 border-b border-gold-500/10 last:border-b-0">
      <h3 className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CheckboxRow({ label, checked, onChange, count }) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5 cursor-pointer group">
      <span className="flex items-center gap-2.5">
        <span
          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors duration-200 ${
            checked
              ? "bg-gold-500 border-gold-500"
              : "border-gold-500/30 group-hover:border-gold-400/60"
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-base-950">
              <path d="M4.5 8.5L2 6l-.7.7L4.5 10l6-6-.7-.7z" />
            </svg>
          )}
        </span>
        <span className="text-sm text-ivory/80 group-hover:text-ivory transition-colors duration-200">
          {label}
        </span>
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-smoke">{count}</span>
      )}
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

function FilterSidebar({
  allCars,
  selectedCategories,
  onToggleCategory,
  priceRange,
  priceMax,
  onPriceChange,
  selectedTransmissions,
  onToggleTransmission,
  selectedFuelTypes,
  onToggleFuelType,
  activeFilterCount,
  onClearAll,
  onClose,
}) {
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.slug] = (allCars || []).filter((c) => c.category === cat.slug).length;
    return acc;
  }, {});

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2 lg:hidden">
        <h2 className="font-display text-lg font-semibold text-ivory">Filters</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="text-ivory/70 hover:text-ivory"
        >
          <HiOutlineXMark className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="hidden lg:block font-display text-lg font-semibold text-ivory">
          Filters
        </h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold uppercase tracking-wide text-gold-400 hover:text-gold-300 transition-colors"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <CheckboxRow
              key={cat.id}
              label={cat.label}
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => onToggleCategory(cat.slug)}
              count={categoryCounts[cat.slug]}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={priceMax}
            step={50}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-gold-500"
          />
          <div className="flex items-center justify-between text-sm text-mist">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Transmission">
        <div className="space-y-0.5">
          {TRANSMISSIONS.map((t) => (
            <CheckboxRow
              key={t}
              label={t}
              checked={selectedTransmissions.includes(t)}
              onChange={() => onToggleTransmission(t)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fuel Type">
        <div className="space-y-0.5">
          {FUEL_TYPES.map((f) => (
            <CheckboxRow
              key={f}
              label={f}
              checked={selectedFuelTypes.includes(f)}
              onChange={() => onToggleFuelType(f)}
            />
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}

export default FilterSidebar;
