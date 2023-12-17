import { useRef, useState } from "react";
import { Navbar, Sidebar } from "./Components";
import MenuIcon from "./Icons/Menu";
import useIsMobile from "~/utils/useIsMobile";
import { cn } from "lib/untils";
import ArrowLeft from "./Icons/ArrowLeft";
import ArrowRight from "./Icons/ArrowRight";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
  closeSidebar?: boolean;
}

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

const Layout = ({ children, closeSidebar }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const elementRef = useRef<HTMLUListElement>(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  // const [showRightArrow, setShowRightArrow] = useState(false);

  // const handleHorizantalScroll = (
  //   element : React.RefObject<HTMLUListElement>,
  //   speed: number,
  //   distance: number,
  //   step: number,
  // ) => {
  //   let scrollAmount = 0;
  //   // console.log(element.scrollLeft);
  //   // console.log(element);

  //   const slideTimer = setInterval(() => {
  //     element.scrollLeft += step;
  //     scrollAmount += Math.abs(step);
  //     if (scrollAmount >= distance) {
  //       clearInterval(slideTimer);
  //     }
  //     if (element.scrollLeft === 0) {
  //       setArrowDisable(true);
  //     } else {
  //       setArrowDisable(false);
  //     }
  //     let maxScrollValue = element.scrollWidth - element.clientWidth;
  //     // console.log("Scroll Width: ", element.scrollWidth);
  //     // console.log("Client Width: ", element.clientWidth);
  //     // console.log(maxScrollValue);
  //     // console.log(element.scrollLeft);

  //     if (element.scrollLeft >= maxScrollValue) {
  //       setArrowVisible(true);
  //     } else {
  //       setArrowVisible(false);
  //     }
  //   }, speed);
  // };

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

  const isMobile = useIsMobile();

  // const MenuItem = ({ text, selected }) => {
  //   return <div className="menu-item">{text}</div>;
  // };

  return (
    <div className="overflow-hidden">
      <Navbar>
        <button
          className={`${
            isMobile ? "hidden" : ""
          }  cursor-pointer p-2 hover:rounded-full  hover:bg-gray-200 sm:flex`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </Navbar>

      {/* // Todo: Category explore */}

      <div className="fixed top-14 z-10  mx-auto  h-14 w-screen  overflow-hidden bg-white md:top-14 ">
        {/* <ul
          className={cn(
            sidebarOpen ? "xl:ml-[264px]" : "xl:ml-[96px] ",
            "mr-10 flex h-full items-center gap-x-3 overflow-auto whitespace-nowrap bg-white px-6  md:ml-[96px] md:px-0 ",
          )}
        >
          <li className=" cursor-pointer rounded-lg bg-black px-3 py-[6px] text-sm font-semibold text-white">
            All
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Live
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Music
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Gaming
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Cartoon
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Movie
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Playlists
          </li>
          <li className="cursor-pointer rounded-lg bg-gray-200 px-3 py-[6px] text-sm font-semibold">
            Game shows
          </li>
        </ul> */}

        {/*  */}
        <div className="ml-6 mr-10 flex  h-full items-center md:ml-0 ">
          {!arrowDisable && (
            <div className="absolute left-0 flex   h-full items-center hover:bg-gradient-to-r hover:from-white hover:via-white/30 hover:to-white/0">
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
              sidebarOpen ? "xl:ml-[264px]" : "xl:ml-[96px] ",
              "flex h-full  select-none items-center gap-x-3 overflow-scroll whitespace-nowrap  bg-white   px-0 scrollbar-none md:ml-[96px] md:px-0 ",
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
            <div className="absolute right-6 flex   h-full items-center hover:bg-gradient-to-r hover:from-white/0 hover:via-white/30 hover:to-white">
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

      <Sidebar
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        closeSidebar={closeSidebar}
      />
      {/* Footer */}
      <div className={cn(isMobile ? "flex " : "hidden")}>
        <Footer />
      </div>

      <div
        className={cn(
          sidebarOpen
            ? "md:pl-[64px] xl:pl-[232px]"
            : "md:pl-[64px] xl:pl-[64px]",
          " mr-8 mt-[72px] px-0 py-8 md:mr-10 md:mt-20  xl:mr-8   ",
        )}
      >
        <main
          className={cn(
            sidebarOpen
              ? " xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 "
              : " xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 ",
            "mx-4 grid h-full  w-full grid-cols-1 gap-y-8 overflow-hidden sm:mx-4 sm:grid-cols-2  md:gap-x-1  md:gap-y-12 lg:grid-cols-3 lg:gap-y-16 2xl:gap-x-1",
          )}
        >
          {" "}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
