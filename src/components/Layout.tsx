import { useEffect, useRef, useState } from "react";
import { Navbar, Sidebar } from "./Components";
import MenuIcon from "./Icons/Menu";
import useIsMobile from "~/utils/useIsMobile";
import { cn } from "lib/untils";

import Footer from "./Footer";
import { usePathname } from "next/navigation";
import SidebarDashboard from "./SidebarDashboard";

interface LayoutProps {
  children: JSX.Element;
  closeSidebar?: boolean;
  isDashboard?: boolean;
}

const Layout = ({ children, closeSidebar, isDashboard }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarBaseVisible, setIsSidebarBaseVisible] = useState(false);

  const pathname = usePathname();
  const isWatch = (pathname || "").includes("/watch");
  // console.log(sidebarOpen);

  useEffect(() => {
    if (isWatch) setIsSidebarBaseVisible(true);
  }, [isWatch]);
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

  const isMobile = useIsMobile();

  // const MenuItem = ({ text, selected }) => {
  //   return <div className="menu-item">{text}</div>;
  // };

  return (
    <div className="overflow-hidden">
      <Navbar isDashboard>
        <button
          className={`${
            isMobile ? "hidden" : ""
          }  cursor-pointer p-2 hover:rounded-full  hover:bg-gray-200 sm:flex`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </Navbar>

      {!isDashboard && (
        <Sidebar
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          closeSidebar={closeSidebar}
        />
      )}

      {isDashboard && (
        <SidebarDashboard
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          closeSidebar={closeSidebar}
        />
      )}

      {/* <SideBarMobile 
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        closeSidebar={closeSidebar}
      /> */}

      {/* Footer */}
      <div className={cn(isMobile ? "flex " : "hidden")}>
        <Footer />
      </div>

      <div
        className={cn(
          sidebarOpen
            ? `md:pl-[64px] ${
                // pathname.includes("/watch") ?? undefined
                isSidebarBaseVisible
                  ? "md:pl-[0px] xl:pl-[64px]"
                  : "xl:pl-[232px]"
              } `
            : `${
                // pathname.includes("/watch") ?? undefined
                isSidebarBaseVisible
                  ? "md:pl-[0px] lg:pl-[64px] "
                  : "md:pl-[64px] "
              }  `,
          " mr-4 h-full px-0  pt-6    xl:mr-8 ",
        )}
      >
        <main
          className={cn(
            // sidebarOpen
            //   ? " xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 "
            //   : " xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 ",
            // "mx-4  h-full  w-full grid  grid-cols-1 gap-y-8  overflow-hidden sm:mx-4 sm:grid-cols-2 md:gap-x-1 md:gap-y-12 lg:grid-cols-3  lg:gap-y-16  xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-1 3xl:grid-cols-5",
            "mx-2  h-full  w-full  ",
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
