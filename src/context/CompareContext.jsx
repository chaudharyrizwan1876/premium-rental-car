import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { CompareContext } from "./compareContextDef";

const STORAGE_KEY = "premium-rental-compare";
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  const isComparing = useCallback(
    (carId) => compareList.some((id) => id === carId),
    [compareList]
  );

  const toggleCompare = useCallback((carId) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= MAX_COMPARE) {
        toast.error(`You can only compare up to ${MAX_COMPARE} cars`);
        return prev;
      }
      return [...prev, carId];
    });
  }, []);

  const clearCompare = useCallback(() => setCompareList([]), []);

  return (
    <CompareContext.Provider
      value={{ compareList, isComparing, toggleCompare, clearCompare, MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}
