import Link from "next/link";
import ArrowLeft from "./Icons/ArrowLeft";
import ArrowRight from "./Icons/ArrowRight";
import { useRef, useState } from "react";
import { cn } from "lib/untils";

const categoryTittle = [
  { name: "All" },
  { name: "Live" },
  { name: "Music", isSelected: true },
  { name: "Gaming" },
  { name: "Cartoon" },
  { name: "Movie" },
  { name: "Playlists" },
  { name: "Game shows" },
];

const SliderTabs = () => {
  const elementRef = useRef(null);

  const [arrowDisable, setArrowDisable] = useState(true);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    // console.log(element.scrollLeft);
    // console.log(element);

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
      let maxScrollValue = element.scrollWidth - element.clientWidth;
      console.log("Scroll Width: ", element.scrollWidth);
      console.log("Client Width: ", element.clientWidth);
      console.log(maxScrollValue);
      console.log(element.scrollLeft);

      if (element.scrollLeft >= maxScrollValue) {
        setArrowVisible(true);
      } else {
        setArrowVisible(false);
      }

      // if (element.scrollLeft === 181) {
      //   setArrowVisible(true);
      // } else {
      //   setArrowVisible(false);
      // }
    }, speed);
  };

  return (
    <>
      <div className="scrollable-tabs-container  relative  max-w-2xl overflow-hidden bg-black  ">
        <div className="left-arrow  absolute left-0 top-0  flex h-full cursor-pointer    ">
          <div className="flex items-center  bg-gradient-to-r from-white  via-white to-white px-2  ">
            <button
              className="flex items-center rounded-full p-3  text-black hover:bg-gray-200"
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 25, 100, -10);
              }}
              disabled={arrowDisable}
            >
              <ArrowLeft className="h-5 w-5 " />
            </button>
          </div>
          <div className="h-full bg-gradient-to-r  from-white via-white/80 to-white/0  px-6"></div>
        </div>

        <ul className="flex gap-x-4 overflow-x-scroll bg-gray-500 p-3 scrollbar-none  ">
          {categoryTittle.map((item, index) => (
            <li
              key={item.name}
              className={cn(
                selectedItem === index
                  ? " bg-black text-white "
                  : "bg-gray-100 text-black hover:bg-gray-200",
                "cursor-pointer select-none whitespace-nowrap  rounded-md px-4  py-1  ",
              )}
              // style={{
              //     background: index === selectedItem ? 'black' : 'white',
              //     color: index === selectedItem ? 'white' : 'black',
              //     padding: '10px',
              //     margin: '5px',
              //     cursor: 'pointer',
              //   }}
             
              // disabled={arrowDisable}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="right-arrow  absolute right-0 top-0  flex h-full    ">
          <div className="h-full bg-gradient-to-r  from-transparent via-white/70 to-white  px-6"></div>
          <div className="flex items-center  bg-gradient-to-r from-white  via-white to-white px-2  ">
            <button
              className="flex cursor-pointer items-center rounded-full  p-3 text-black hover:bg-gray-200 "
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 25, 100, 10);
              }}
              // disabled={arrowDisable}
            >
              <ArrowRight className="h-5 w-5 " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderTabs;
