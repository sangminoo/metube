import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Search from "./Icons/Search";

interface Tab {
  label: string;
  path: string;
  current: boolean;
  content: string;
}

interface TabsProps {
  tabsData: Tab[];
}

export function Tabs({ tabsData }: TabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const router = useRouter();
  const tabsRef = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    }

    // Thêm event listener khi component được mount
    document.addEventListener("mousedown", handleClickOutside);

    // Xóa event listener khi component bị unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <nav className="flex items-center gap-x-3 space-x-3 border-b">
          {tabsData.map((tab, idx) => {
            const isTabActive = idx === activeTabIndex;
            return (
              <Link
                href={tab.path ?? "/"}
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className={`pb-3 pt-2 text-lg font-semibold ${
                  isTabActive ? "text-black " : "text-gray-500 hover:text-black"
                }`}
                onClick={() => {
                  setActiveTabIndex(idx);
                  void router.push(tab.path ?? "/");
                }}
              >
                {tab.label}
              </Link>
            );
          })}

          <button className="py-1 pl-2 " onClick={() => setIsSearch(true)}>
            <Search className="h-6 w-6" />
          </button>
          {isSearch && (
            <div className="relative mb-1 h-6 w-full max-w-[200px]">
              <input
                ref={inputRef}
                placeholder="Search"
                className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-2.5 pt-2 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              />
              <label className="after:content[' '] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent" />
            </div>
          )}
        </nav>
        <span
          className="absolute bottom-0 mb-[1px] block h-[2px]  rounded-full bg-black transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
        <span className="absolute bottom-0  mb-[1px] h-[2px] rounded-full transition-all duration-300 hover:bg-gray-200" />
      </div>
      <div className="py-4">
        <p>{tabsData[activeTabIndex].content}</p>
      </div>
    </div>
  );
}
