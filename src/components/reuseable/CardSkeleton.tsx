type CardSkeletonProps = {
  count?: number;
};

const CardSkeleton = ({ count = 1 }: CardSkeletonProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 min-h-94.5 min-w-[24%]">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>

          {/* Dose */}
          <div className="mt-3 h-3 w-24 rounded bg-gray-200" />

          {/* Time Info */}
          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-200" />
            </div>

            <div className="flex justify-between">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="mb-2 flex justify-between">
              <div className="h-2 w-16 rounded bg-gray-200" />
              <div className="h-2 w-12 rounded bg-gray-200" />
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200" />
          </div>

          {/* Footer */}
          <div className="mt-5 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="flex justify-between">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="h-3 w-12 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
