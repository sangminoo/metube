import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeletonVideo({ cards }: { cards: number }) {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index}>
        <div className="w-full space-y-5 rounded-md p-2">
          <div className="flex flex-col gap-y-2">
            <Skeleton
              className="py-28 md:py-56 lg:py-44 xl:py-60 "
              borderRadius={12}
            />
            <div className="w-full">
              <div className="flex items-center justify-between ">
                <Skeleton className="px-24 py-[2px]" borderRadius={20} />
                <div className="flex h-full items-center gap-x-3">
                  {/* {(function () {
                    const arr: [] = [];
                    for (let i = 0; i < 5; i++) {
                      arr.push(
                        <Skeleton key={i} circle width={20} height={20} />,
                      );
                    }
                    return <>{arr}</>;
                  })()} */}
                  <Skeleton circle width={20} height={20} />
                  <Skeleton circle width={20} height={20} />
                  <Skeleton circle width={20} height={20} />
                  <Skeleton circle width={20} height={20} />
                  <Skeleton circle width={20} height={20} />
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-12 items-center justify-between">
              <div className=" col-span-9  ">
                <div className="flex gap-x-2">
                  <Skeleton circle width={45} height={45} />
                  <div className="flex flex-col gap-y-2 lg:gap-y-1  ">
                    <Skeleton className="px-24 py-[2px]" borderRadius={20} />
                    <Skeleton className="px-24 py-[2px]" borderRadius={20} />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <Skeleton className="py-3 " borderRadius={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
}
