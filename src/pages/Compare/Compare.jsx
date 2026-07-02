import { useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineScale, HiOutlineXMark, HiCheckCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useCompare } from "../../hooks/useCompare";
import { getAllCars } from "../../services/carService";
import { formatPrice } from "../../utils/formatters";
import { buildCarDetailsPath, buildBookingPath } from "../../routes/paths";
import Button from "../../components/common/Button";

const SPEC_ROWS = [
  { key: "category", label: "Category" },
  { key: "year", label: "Year" },
  { key: "engine", label: "Engine" },
  { key: "transmission", label: "Transmission" },
  { key: "fuelType", label: "Fuel Type" },
  { key: "seats", label: "Seats", format: (v) => `${v} Seats` },
  { key: "topSpeed", label: "Top Speed" },
  { key: "mileage", label: "Mileage / Range" },
  { key: "rating", label: "Rating", format: (v) => `${v} / 5` },
];

function CompareEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-24 px-6"
    >
      <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
        <HiOutlineScale className="w-9 h-9 text-gold-400/60" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-ivory">
        No cars to compare
      </h2>
      <p className="text-mist text-sm mt-3 max-w-sm leading-relaxed">
        Browse our fleet and use the compare icon on any car card to add up to 3
        vehicles here for a side-by-side breakdown.
      </p>
      <Button to="/cars" variant="primary" size="md" className="mt-8">
        Explore Fleet
      </Button>
    </motion.div>
  );
}

function Compare() {
  const { compareList, toggleCompare, clearCompare } = useCompare();

  const fetcher = useCallback(() => getAllCars(), []);
  const { data: allCars, isLoading } = useFetch(fetcher);

  const comparedCars = (allCars || []).filter((car) =>
    compareList.includes(car.id)
  );

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <nav className="text-xs text-smoke mb-3 flex items-center gap-2">
              <Link to="/" className="hover:text-gold-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-mist">Compare</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
              Compare Cars
            </h1>
            {comparedCars.length > 0 && (
              <p className="text-mist text-sm mt-2">
                Comparing {comparedCars.length} vehicle
                {comparedCars.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {comparedCars.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/20 text-sm text-mist hover:text-danger hover:border-danger/40 transition-colors duration-200"
            >
              <HiOutlineXMark className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-64 bg-base-900 rounded-2xl" />
            ))}
          </div>
        )}

        {!isLoading && compareList.length === 0 && <CompareEmpty />}

        {!isLoading && comparedCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Car image headers */}
            <div className={`grid gap-4 mb-6 grid-cols-${comparedCars.length} lg:grid-cols-${comparedCars.length}`}
              style={{ gridTemplateColumns: `repeat(${comparedCars.length}, 1fr)` }}
            >
              {comparedCars.map((car) => (
                <div
                  key={car.id}
                  className="relative rounded-2xl border border-gold-500/10 bg-base-900 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleCompare(car.id)}
                    aria-label="Remove from compare"
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-base-950/80 flex items-center justify-center text-mist hover:text-danger transition-colors duration-200"
                  >
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>

                  <div className="aspect-[4/3] bg-base-850 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-mist">
                      {car.brand}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-ivory mt-1 leading-snug">
                      {car.name}
                    </h3>
                    <p className="text-gold-400 font-semibold mt-2">
                      {formatPrice(car.price)}
                      <span className="text-smoke text-xs font-normal"> / day</span>
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <Link
                        to={buildCarDetailsPath(car.id)}
                        className="flex-1 text-center px-3 py-2 rounded-lg border border-gold-500/20 text-xs font-medium text-ivory hover:border-gold-400/50 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <Link
                        to={buildBookingPath(car.id)}
                        className="flex-1 text-center px-3 py-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 text-xs font-semibold transition-shadow duration-200 hover:shadow-gold-glow"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec comparison table */}
            <div className="rounded-2xl border border-gold-500/10 overflow-hidden">
              {SPEC_ROWS.map((row, rowIndex) => {
                const values = comparedCars.map((car) => {
                  const raw = car[row.key];
                  return row.format ? row.format(raw) : String(raw ?? "—");
                });

                return (
                  <div
                    key={row.key}
                    className={`grid gap-px ${rowIndex % 2 === 0 ? "bg-base-900" : "bg-base-950"}`}
                    style={{ gridTemplateColumns: `200px repeat(${comparedCars.length}, 1fr)` }}
                  >
                    <div className="px-5 py-4 flex items-center">
                      <span className="text-xs uppercase tracking-wider text-smoke font-medium">
                        {row.label}
                      </span>
                    </div>
                    {values.map((val, ci) => (
                      <div key={ci} className="px-5 py-4 flex items-center">
                        <span className="text-sm text-ivory">{val}</span>
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Features row */}
              <div
                className="grid gap-px bg-base-900"
                style={{ gridTemplateColumns: `200px repeat(${comparedCars.length}, 1fr)` }}
              >
                <div className="px-5 py-5 flex items-start">
                  <span className="text-xs uppercase tracking-wider text-smoke font-medium">
                    Features
                  </span>
                </div>
                {comparedCars.map((car) => (
                  <div key={car.id} className="px-5 py-5">
                    <div className="space-y-1.5">
                      {(car.features || []).map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <HiCheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span className="text-xs text-ivory/80">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Compare;
