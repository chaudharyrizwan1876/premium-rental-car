import { useCallback, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from "react-icons/hi2";
import { useFetch } from "../../hooks/useFetch";
import { useCarFilters } from "../../hooks/useCarFilters";
import { getAllCars } from "../../services/carService";
import CarCard from "../../components/cars/CarCard";
import CarCardSkeleton from "../../components/cars/CarCardSkeleton";
import FilterSidebar from "../../components/cars/FilterSidebar";
import SortDropdown from "../../components/cars/SortDropdown";
import Pagination from "../../components/cars/Pagination";
import EmptyState from "../../components/cars/EmptyState";

const PAGE_SIZE = 9;

function CarsInner() {
  const fetcher = useCallback(() => getAllCars(), []);
  const { data: allCars, isLoading, error, refetch } = useFetch(fetcher);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    toggleCategory,
    priceRange,
    priceMax,
    setPriceRange,
    selectedTransmissions,
    toggleTransmission,
    selectedFuelTypes,
    toggleFuelType,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    filteredCars,
    activeFilterCount,
    clearAllFilters,
  } = useCarFilters(allCars);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / PAGE_SIZE));
  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCars.slice(start, start + PAGE_SIZE);
  }, [filteredCars, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-3">
            The Full Fleet
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
            Browse Our Cars
          </h1>
          <p className="mt-3 text-mist text-base max-w-xl">
            {isLoading
              ? "Loading the fleet..."
              : `${filteredCars.length} vehicle${filteredCars.length === 1 ? "" : "s"} available`}
          </p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-mist" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full bg-base-900 border border-gold-500/15 rounded-xl pl-11 pr-4 py-2.5 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors duration-200"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 rounded-xl border border-gold-500/15 px-4 py-2.5 text-sm text-ivory hover:border-gold-400/40 transition-colors duration-200"
          >
            <HiOutlineAdjustmentsHorizontal className="w-4.5 h-4.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold-500 text-base-950 text-[11px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              allCars={allCars}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              priceRange={priceRange}
              priceMax={priceMax}
              onPriceChange={setPriceRange}
              selectedTransmissions={selectedTransmissions}
              onToggleTransmission={toggleTransmission}
              selectedFuelTypes={selectedFuelTypes}
              onToggleFuelType={toggleFuelType}
              activeFilterCount={activeFilterCount}
              onClearAll={clearAllFilters}
            />
          </div>

          {/* Results */}
          <div>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && error && (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-gold-500/10 bg-base-900">
                <p className="text-ivory font-medium">Couldn&apos;t load the fleet</p>
                <p className="text-mist text-sm mt-1.5">{error}</p>
                <button
                  type="button"
                  onClick={refetch}
                  className="mt-6 px-5 py-2.5 rounded-full border border-gold-500/40 text-ivory text-sm hover:bg-gold-500/10 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            )}

            {!isLoading && !error && filteredCars.length === 0 && (
              <EmptyState onClearFilters={clearAllFilters} />
            )}

            {!isLoading && !error && filteredCars.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCars.map((car, index) => (
                    <CarCard key={car.id} car={car} index={index} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-base-950 z-50 lg:hidden overflow-y-auto px-6 py-6"
            >
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="absolute top-6 right-6 text-ivory/70 hover:text-ivory"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
              <FilterSidebar
                allCars={allCars}
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
                priceRange={priceRange}
                priceMax={priceMax}
                onPriceChange={setPriceRange}
                selectedTransmissions={selectedTransmissions}
                onToggleTransmission={toggleTransmission}
                selectedFuelTypes={selectedFuelTypes}
                onToggleFuelType={toggleFuelType}
                activeFilterCount={activeFilterCount}
                onClearAll={clearAllFilters}
                onClose={() => setIsMobileFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Cars() {
  const [searchParams] = useSearchParams();
  // Remounting on category change re-derives filter state fresh from the
  // URL (see useCarFilters' useState initializer) without needing an
  // effect-based sync, which keeps the filtering hook free of setState-in-effect.
  return <CarsInner key={searchParams.get("category") || "all"} />;
}
