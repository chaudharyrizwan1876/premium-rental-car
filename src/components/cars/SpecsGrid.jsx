import {
  HiOutlineCog,
  HiOutlineFire,
  HiOutlineUserGroup,
  HiOutlineBolt,
  HiOutlineArrowsPointingOut,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

function SpecsGrid({ car }) {
  const specs = [
    { icon: HiOutlineCalendarDays, label: "Year", value: car.year },
    { icon: HiOutlineCog, label: "Transmission", value: car.transmission },
    { icon: HiOutlineFire, label: "Fuel Type", value: car.fuelType },
    { icon: HiOutlineUserGroup, label: "Seats", value: `${car.seats} Seats` },
    { icon: HiOutlineBolt, label: "Engine", value: car.engine },
    { icon: HiOutlineArrowsPointingOut, label: "Top Speed", value: car.topSpeed },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-center gap-3 p-4 rounded-xl border border-gold-500/10 bg-base-900"
        >
          <span className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
            <spec.icon className="w-4.5 h-4.5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-smoke">{spec.label}</p>
            <p className="text-sm font-medium text-ivory truncate">{spec.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecsGrid;
