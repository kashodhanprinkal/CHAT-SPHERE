import React from 'react'

function UserLoadingSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 animate-pulse"
        >
          {/* Profile image skeleton */}
          <div className="w-12 h-12 rounded-full bg-slate-700" />

          {/* Text skeleton */}
          <div className="flex-1 space-y-2">
            {/* Username */}
            <div className="h-4 w-1/3 rounded bg-slate-700" />

            {/* Status / message */}
            <div className="h-3 w-1/4 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLoadingSkeleton;