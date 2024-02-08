import { cn } from "lib/untils";
import { ArrowLeft, ArrowRight } from "./Icons/Icons";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const categoryTittle = [
  { name: "All", isSelected: false },
  { name: "Live", isSelected: false },
  { name: "Music", isSelected: false },
  { name: "Gaming", isSelected: false },
  { name: "Cartoon", isSelected: false },
  { name: "Movie", isSelected: false },
  { name: "Playlists", isSelected: false },
  { name: "Game shows", isSelected: false },
];

const SliderTabs = ({
  isFixed,
  className,
}: {
  isFixed: boolean;
  className?: string;
}) => {
  const elementRef = useRef<HTMLUListElement>(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleHorizantalScroll = (
    elementRef: React.RefObject<HTMLUListElement>,
    speed: number,
    distance: number,
    step: number,
  ) => {
    const element = elementRef.current;
    // console.log(element);

    if (element !== null) {
      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
        if (element.scrollLeft === 0) {
          setArrowDisable(true);
        } else {
          setArrowDisable(false);
        }

        const maxScrollValue = element.scrollWidth - element.clientWidth;
        if (element.scrollLeft >= maxScrollValue) {
          setArrowVisible(true);
        } else {
          setArrowVisible(false);
        }
      }, speed);
    }
  };

  return (
    <>
      <div
        className={cn(
          // isFixed ? "fixed top-12 md:top-14" : "relative",
          // isFixed && className ? className : "relative",
          isFixed ? `fixed ${className}` : "relative ",

          "z-10  mx-auto h-14 w-full  overflow-hidden bg-white ",
        )}
      >
        {/*  */}
        <div className=" xs:mr-8 flex  h-full items-center md:ml-0 ">
          {!arrowDisable && (
            <div className="hidden xs:absolute left-0 xs:flex   h-full items-center hover:bg-gradient-to-r hover:from-white hover:via-white/30 hover:to-white/0">
              <div className="flex h-full items-center bg-white p-1">
                <button
                  className="cursor-pointer rounded-full p-3 hover:bg-slate-200 "
                  onClick={() => {
                    handleHorizantalScroll(elementRef, 25, 100, -10);
                  }}
                  disabled={arrowDisable}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="h-full bg-gradient-to-r  from-white via-white/50 to-white/0 px-6 "></div>
            </div>
          )}
          <ul
            className={cn(
              //   sidebarOpen ? "xl:ml-[264px]" : "xl:ml-[96px] ",

              "mx-4 flex  h-full select-none items-center gap-x-3 overflow-scroll  whitespace-nowrap   bg-white px-0  scrollbar-none md:mx-0 md:px-0 ",
            )}
            ref={elementRef}
          >
            {categoryTittle.map((title, i) => (
              <li
                key={i}
                className={cn(
                  selectedItem === i
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black",
                  "cursor-pointer rounded-lg  px-3 py-[6px] text-sm font-semibold ",
                )}
                onClick={() => setSelectedItem(i)}
              >
                {title.name}
              </li>
            ))}
          </ul>
          {/* <div
              className="flex w-full gap-x-6 overflow-hidden pt-5 "
              ref={elementRef}
            >
              {categoryTittle.map((title, i) => (
                <div key={i} className="rounded-md bg-black p-6 text-white">
                  {title.name}
                </div>
              ))}
            </div> */}
          {!arrowVisible && (
            <div className=" hidden xs:absolute right-0 xs:flex   h-full items-center hover:bg-gradient-to-r hover:from-white/0 hover:via-white/30 hover:to-white">
              <div className="h-full bg-gradient-to-r  from-white/0 via-white/50 to-white px-6 "></div>
              <div className="flex h-full items-center bg-white p-1">
                <button
                  className="cursor-pointer rounded-full p-3 hover:bg-slate-200 "
                  onClick={() => {
                    handleHorizantalScroll(elementRef, 25, 100, 10);
                  }}
                  // disabled={arrowDisable}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/*  */}
      </div>
    </>
  );
};

export default SliderTabs;
