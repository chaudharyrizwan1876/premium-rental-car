function CarCardSkeleton() {
  return (
    <div className="rounded-2xl bg-base-900 border border-gold-500/10 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-base-850" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-2.5 w-16 bg-base-800 rounded" />
          <div className="h-4 w-32 bg-base-800 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-base-800 rounded" />
          <div className="h-3 w-16 bg-base-800 rounded" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gold-500/10">
          <div className="h-5 w-20 bg-base-800 rounded" />
          <div className="h-3 w-20 bg-base-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export default CarCardSkeleton;
