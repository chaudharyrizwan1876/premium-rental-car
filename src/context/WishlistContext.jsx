import { useEffect, useState, useCallback } from "react";
import { WishlistContext } from "./wishlistContextDef";

const STORAGE_KEY = "premium-rental-wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = useCallback(
    (carId) => wishlist.some((id) => id === carId),
    [wishlist]
  );

  const toggleWishlist = useCallback((carId) => {
    setWishlist((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  }, []);

  const removeFromWishlist = useCallback((carId) => {
    setWishlist((prev) => prev.filter((id) => id !== carId));
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
