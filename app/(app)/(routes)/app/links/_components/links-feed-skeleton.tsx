import React from "react";

const LinksFeedSkeleton = () => {
  var items = 8;
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <article
          key={i}
          className="p-6 rounded-lg bg-background flex items-center space-x-4 border"
        >
          <div className="h-8 w-8 rounded-full sm:h-10 sm:w-10 animate-pulse bg-muted" />
          <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
            <div className="bg-muted h-7 animate-pulse max-w-md rounded-full"></div>
            <div className="bg-muted max-w-md h-5 animate-pulse rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 animate-pulse bg-muted rounded-lg"></div>
          </div>
        </article>
      ))}
    </>
  );
};

export default LinksFeedSkeleton;
