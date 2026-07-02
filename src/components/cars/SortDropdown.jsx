import { HiOutlineChevronDown } from "react-icons/hi2";
import { SORT_OPTIONS } from "../../constants";

function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-base-900 border border-gold-500/15 rounded-xl pl-4 pr-10 py-2.5 text-sm text-ivory cursor-pointer hover:border-gold-400/40 focus:outline-none focus:border-gold-400/60 transition-colors duration-200 [&>option]:bg-base-850"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <HiOutlineChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist pointer-events-none" />
    </div>
  );
}

export default SortDropdown;
