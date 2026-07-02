import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const PRICE_MAX_DEFAULT = 2500;

/**
 * Centralizes all Cars-page filtering/sorting/search logic so the page
 * component itself only wires UI to this hook's returned state and setters.
 * Reads `category` and a free-text `q` from the URL on first load (e.g. when
 * arriving from a Category card or the Hero SearchBar), then manages further
 * changes in local state without re-writing the URL on every keystroke.
 */
export function useCarFilters(allCars) {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const fromUrl = searchParams.get("category");
    return fromUrl ? [fromUrl] : [];
  });
  const [priceRange, setPriceRange] = useState([0, PRICE_MAX_DEFAULT]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Note: selectedCategories initializes from the URL on first mount (see
  // useState above). If the URL's category param changes after that (e.g.
  // clicking a different Category card while already on /cars), the page
  // remounts because Home and Cars are different routes — but navigating
  // from one category link to another while ON /cars would need this synced.
  // We handle that case in the category Link's onClick elsewhere, keeping
  // this hook free of setState-in-effect.

  const toggleCategory = useCallback((slug) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }, []);

  const toggleTransmission = useCallback((value) => {
    setCurrentPage(1);
    setSelectedTransmissions((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  }, []);

  const toggleFuelType = useCallback((value) => {
    setCurrentPage(1);
    setSelectedFuelTypes((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  }, []);

  const updateSearchTerm = useCallback((value) => {
    setCurrentPage(1);
    setSearchTerm(value);
  }, []);

  const updatePriceRange = useCallback((value) => {
    setCurrentPage(1);
    setPriceRange(value);
  }, []);

  const updateSortBy = useCallback((value) => {
    setCurrentPage(1);
    setSortBy(value);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, PRICE_MAX_DEFAULT]);
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setSortBy("default");
    setCurrentPage(1);
  }, []);

  const activeFilterCount =
    selectedCategories.length +
    selectedTransmissions.length +
    selectedFuelTypes.length +
    (priceRange[0] > 0 || priceRange[1] < PRICE_MAX_DEFAULT ? 1 : 0);

  const filteredCars = useMemo(() => {
    if (!allCars) return [];

    let result = allCars.filter((car) => {
      const matchesSearch =
        !searchTerm ||
        `${car.brand} ${car.name}`.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(car.category);

      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

      const matchesTransmission =
        selectedTransmissions.length === 0 ||
        selectedTransmissions.includes(car.transmission);

      const matchesFuel =
        selectedFuelTypes.length === 0 || selectedFuelTypes.includes(car.fuelType);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesTransmission &&
        matchesFuel
      );
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [allCars, searchTerm, selectedCategories, priceRange, selectedTransmissions, selectedFuelTypes, sortBy]);

  return {
    // state
    searchTerm,
    selectedCategories,
    priceRange,
    selectedTransmissions,
    selectedFuelTypes,
    sortBy,
    currentPage,
    filteredCars,
    activeFilterCount,
    priceMax: PRICE_MAX_DEFAULT,
    // setters
    setSearchTerm: updateSearchTerm,
    toggleCategory,
    setPriceRange: updatePriceRange,
    toggleTransmission,
    toggleFuelType,
    setSortBy: updateSortBy,
    setCurrentPage,
    clearAllFilters,
  };
}
