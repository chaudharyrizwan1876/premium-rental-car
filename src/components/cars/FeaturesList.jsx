import { HiCheckCircle } from "react-icons/hi2";

function FeaturesList({ features }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2.5">
          <HiCheckCircle className="w-4.5 h-4.5 text-gold-400 shrink-0" />
          <span className="text-sm text-ivory/85">{feature}</span>
        </div>
      ))}
    </div>
  );
}

export default FeaturesList;
