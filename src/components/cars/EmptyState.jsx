import { HiOutlineFaceFrown } from "react-icons/hi2";
import Button from "../common/Button";

function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-gold-500/10 bg-base-900">
      <HiOutlineFaceFrown className="w-10 h-10 text-gold-500/50 mb-4" />
      <p className="text-ivory font-medium text-lg">No cars match your filters</p>
      <p className="text-mist text-sm mt-1.5 max-w-sm">
        Try adjusting your search or clearing some filters to see more results.
      </p>
      <Button onClick={onClearFilters} variant="secondary" size="sm" className="mt-6">
        Clear All Filters
      </Button>
    </div>
  );
}

export default EmptyState;
