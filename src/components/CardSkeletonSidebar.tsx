import { cn } from "lib/untils";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIsMobile from "~/utils/useIsMobile";

export default function CardSkeletonSideBar({ cards }: { cards: number }) {
  const isMobile = useIsMobile();
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="" key={index}>
        <div
          className={cn(
            !isMobile ? " flex-row" : "flex-col ",
            "my-4 flex gap-2 rounded-md",
          )}
        >
          {/* <Skeleton
            className={cn(
              isMobile ? "py-24" : "py-6",
              "  lg:py-[88px]",
            )}
            borderRadius={12}
          /> */}
          <Skeleton className="px-24 py-10" borderRadius={12} />
          <div className=" flex w-full sm:flex-row items-start overflow-hidden text-xs  max-lg:mx-2">
            <Skeleton circle width={40} height={40} className="hidden" />
            <div className="ml-2 flex w-full flex-col gap-y-2  lg:gap-y-1 ">
              <Skeleton className="max-w-[90%] py-[3px] lg:py-[2px]" />
              <Skeleton className="max-w-[70%] py-[3px] lg:py-[2px]" />
            </div>
          </div>
        </div>
      </div>
    ));
}
