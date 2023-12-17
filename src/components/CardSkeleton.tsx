import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton({cards}: {cards: number}) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="flex flex-col gap-3" key={index}>
        <div className="w-full space-y-5 rounded-md p-2">
          <div className="flex flex-col gap-y-2">
            <Skeleton
              className="py-28 md:py-28 lg:py-[88px] "
              borderRadius={12}
            />
            <div className="flex gap-x-2  ">
              <Skeleton circle width={35} height={35} />
              <div className="flex w-full flex-col gap-y-2 lg:gap-y-1">
                <Skeleton className="max-w-[90%] py-[3px] lg:py-[2px]" />
                <Skeleton className="max-w-[70%] py-[3px] lg:py-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
}
