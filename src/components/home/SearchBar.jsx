import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";

const LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "Miami, FL",
  "Las Vegas, NV",
  "Chicago, IL",
];

/**
 * Embedded in the Hero on Home, and reusable at the top of the Cars page.
 * On submit, navigates to /cars with query params the Cars page reads
 * to pre-fill its own filters.
 */
function SearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (pickupDate) params.set("pickup", pickupDate);
    if (returnDate) params.set("return", returnDate);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`glass-panel rounded-2xl p-6 sm:p-7 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] gap-5 sm:gap-6 ${className}`}
    >
      {/* Location */}
      <label className="flex flex-col gap-2 px-1">
        <span className="text-[11px] uppercase tracking-wider text-mist flex items-center gap-1.5">
          <HiOutlineLocationMarker className="w-3.5 h-3.5" />
          Pick-up Location
        </span>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent text-ivory text-sm font-medium focus:outline-none cursor-pointer [&>option]:bg-base-850"
        >
          <option value="" className="text-mist">
            Select location
          </option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </label>

      {/* Pickup Date */}
      <label className="flex flex-col gap-2 px-1 border-t sm:border-t-0 sm:border-l border-gold-500/10 pt-4 sm:pt-0 sm:pl-6">
        <span className="text-[11px] uppercase tracking-wider text-mist flex items-center gap-1.5">
          <HiOutlineCalendar className="w-3.5 h-3.5" />
          Pick-up Date
        </span>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="bg-transparent text-ivory text-sm font-medium focus:outline-none [color-scheme:dark]"
        />
      </label>

      {/* Return Date */}
      <label className="flex flex-col gap-2 px-1 border-t sm:border-t-0 sm:border-l border-gold-500/10 pt-4 sm:pt-0 sm:pl-6">
        <span className="text-[11px] uppercase tracking-wider text-mist flex items-center gap-1.5">
          <HiOutlineCalendar className="w-3.5 h-3.5" />
          Return Date
        </span>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={pickupDate || undefined}
          className="bg-transparent text-ivory text-sm font-medium focus:outline-none [color-scheme:dark]"
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold uppercase tracking-wide text-sm px-8 py-4 sm:py-0 sm:px-7 hover:shadow-gold-glow transition-shadow duration-300 col-span-1 sm:col-span-2 lg:col-span-1"
      >
        <HiOutlineSearch className="w-4 h-4" />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
