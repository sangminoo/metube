import Link from "next/link";
import { Logo } from "./Icons/Logo";
import Search from "./Icons/Search";
import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  Fragment,
} from "react";
import Micro from "./Icons/Micro";
import Keyboard from "./Icons/Keyboard";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserImage } from "./Components";
import DotsVertical from "./Icons/DotsVertical";
import Settings from "./Icons/Settings";
import HelpCircle from "./Icons/HelpCircle";
import { cn } from "lib/untils";
import Bell from "./Icons/Bell";
import Camera from "./Icons/Camera";
import { Left } from "./Icons/Icons";
import useIsMobile from "~/utils/useIsMobile";

interface NavbarProps {
  children: React.ReactNode;
  isDashboard?: boolean
}

interface NavigationItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

const Navbar = ({ children }: NavbarProps) => {
  const [SearchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const isMobile = useIsMobile();

  const router = useRouter();
  const { data: sessionData } = useSession();

  const signedInNavigation: NavigationItem[] = [
    {
      icon: (className: string) => <Settings className={className} />,
      name: "Account Google",
      path: "https://myaccount.google.com",
      lineAbove: false,
    },

    {
      icon: (className: string) => <Settings className={className} />,
      name: "Your data in Youtube",
      path: "/",
      lineAbove: false,
    },

    {
      icon: (className: string) => <Settings className={className} />,
      name: "Sign out",
      path: "sign-out",
      lineAbove: false,
    },
    {
      icon: (className: string) => <Settings className={className} />,
      name: "Youtube Studio",
      path: `/dashboard`,
      lineAbove: true,
    },
    {
      icon: (className: string) => <Settings className={className} />,
      name: "Settings",
      path: "/",
      lineAbove: true,
    },
    {
      icon: (className: string) => <HelpCircle className={className} />,
      name: "Help",
      path: "/account",
      lineAbove: true,
    },
    {
      icon: (className: string) => <HelpCircle className={className} />,
      name: "Feedbacks",
      path: "/",
      lineAbove: false,
    },
  ];

  const signedOutNavigation: NavigationItem[] = [
    {
      icon: (className: string) => <Settings className={className} />,
      name: "Your data in Youtube",
      path: "https://myaccount.google.com",
      lineAbove: false,
    },

    {
      icon: (className: string) => <Settings className={className} />,
      name: "Settings",
      path: "",
      lineAbove: false,
    },
    {
      icon: (className: string) => <HelpCircle className={className} />,
      name: "Help",
      path: "/account",
      lineAbove: false,
    },
    {
      icon: (className: string) => <HelpCircle className={className} />,
      name: "Feedbacks",
      path: "/",
      lineAbove: false,
    },
  ];

  const handleSearch = async () => {
    try {
     
      
      await router.push({
        pathname: "/SearchPage",
        query: { q: SearchInput },
      });

    } catch (error) {
      console.log("Something went wrong to search page", error);
    }
  };

  const handleInputFocus = () => {
    setIsSearch(true);
  };
  const handleInputBlur = () => {
    setIsSearch(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSearch();

    }
  };
  return (
    <div className="fixed z-50 mx-auto  w-full bg-white lg:overflow-visible">
      {/* input search mobile */}
      <div className="absolute top-0 z-40 mx-auto  hidden w-full items-center justify-between bg-gray-100 px-3  py-4 shadow-inherit sm:hidden">
        <Left className="h-7 w-7" />
        <div className="relative mx-3 flex h-full  w-full items-center">
          <input
            type="text"
            placeholder="Search on Youtube"
            className="right-1 w-full rounded-full bg-gray-200 py-1 pl-4 pr-10 text-base shadow-inherit outline-none placeholder:text-gray-500"
          />
          <Search className="absolute bottom-0 right-3 top-0 my-auto h-6 w-6 " />
        </div>
        <div className=" rounded-full bg-gray-200 p-[6px] ">
          <Micro className="h-5 w-5" />
        </div>
      </div>
      {/*  */}
      <div
        className={`${
          isMobile ? "mx-3" : "mx-4"
        } flex  max-w-full   xl:grid xl:grid-cols-12 `}
      >
        <div className=" flex flex-shrink-0 items-center lg:static xl:col-span-2">
          {children}
          <Link
            href={"#"}
            aria-label="Home"
            className="relative flex items-center justify-center md:px-4"
          >
            {/* <div className="mx-3 flex sm:max-h-14 max-h-[48px] items-center"> */}
            <div
              className={`${
                isMobile ? "mx-0 max-h-[48px]" : "mx-4 sm:max-h-14 md:mx-0"
              }  flex items-center  `}
            >
              <Logo className="h-fit w-fit  md:relative" />
            </div>
            <p
              className={` ${
                isMobile && "hidden"
              } absolute -right-[2px] top-[10px]  font-mono text-[11px] tracking-wider text-gray-800 md:block`}
            >
              VN
            </p>
          </Link>
        </div>

        {/* input search */}
        <div className=" mx-4 w-full min-w-0 flex-1 lg:px-0 xl:col-span-8">
          <div className="mx-6 hidden h-full items-center justify-center px-6 sm:flex lg:mx-auto lg:w-[60%] lg:max-w-none xl:px-0">
            <div className="w-full  ">
              <div></div>
              <label htmlFor="search" className="sr-only flex ">
                Search
              </label>

              <div className="relative flex items-center ">
                {isSearch && (
                  <div className="pointer-events-none inset-y-0 start-0 hidden grid-rows-2 items-center ps-3 md:absolute md:flex">
                    <Search className=" h-4 w-4 stroke-gray-600" />
                  </div>
                )}

                <div className="absolute right-36 hidden md:block">
                  <Keyboard className=" h-4 w-4 cursor-pointer opacity-75 hover:opacity-100" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="hidden w-full  rounded-bl-full  rounded-tl-full py-2  pl-10 pr-10 tracking-tighter   text-gray-900 shadow-inner shadow-gray-200 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-lg placeholder:text-gray-500 focus:ring-2   focus:ring-inset focus:ring-blue-700 sm:flex sm:text-sm sm:leading-6  "
                  placeholder="Search"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  type="search"
                  value={SearchInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

                <button
                  onClick={handleSearch}
                  disabled={ SearchInput.trim() ? false : true }
                  className="right-0 -ml-[1px] hidden  rounded-br-full hover:cursor-pointer  rounded-tr-full bg-gray-100  px-6  py-3 ring-1 ring-inset    ring-gray-300 placeholder:text-gray-400 hover:bg-gray-200  hover:ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:block sm:text-sm sm:leading-6"
                >
                  <Search className=" h-4 w-4  stroke-gray-600" />
                </button>

                <div className="ml-0 hidden cursor-pointer rounded-full p-3 hover:bg-gray-200 sm:ml-4 sm:block  sm:bg-gray-100  md:hover:bg-gray-300">
                  <Micro className="h-5 w-5 " />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* input search 2 */}
        {/* <div className="h-full w-full min-w-0 flex-1 bg-gray-100 lg:px-0 xl:col-span-8">
          <div className="flex h-full w-full items-center justify-center rounded-tl-full rounded-bl-full ">
            <div>Empty</div>
          <div className="relative">
              <div className=" p-2 bg-gray-300 rounded-tl-full rounded-bl-full absolute -left-4 ">S</div>
              <div className=" items-center bg-gray-300 p-2 rounded-tl-full rounded-bl-full w-[320px]">Input</div>
          </div>
            <div>Search Icon</div>
            <div>empty</div>
          </div>
        </div> */}

        {/* Nav right */}
        <div className=" col-span-2  flex items-center justify-end  ">
          {/* {sessionData?.user?.email ?? "UnKnow"} */}
          <div className="m-0  flex w-max px-0 lg:items-center lg:justify-end xl:col-span-2 ">
            {sessionData ? (
              //  {/* TODO:icon video */}
              <div className="flex items-center gap-x-2 sm:gap-x-4">
                <Camera className="hidden h-6 w-6 cursor-pointer md:block" />

                {/* TODO: Icon bell notification */}
                <div className="ml-0 cursor-pointer rounded-full p-2 hover:bg-gray-100    md:hover:bg-gray-300">
                  <Bell
                    className={`${
                      isMobile ? "h-5 w-5" : "h-6 w-6"
                    }    stroke-gray-600`}
                  />
                </div>

                {/*  */}
                <div className="ml-0 cursor-pointer rounded-full p-2 hover:bg-gray-200 md:ml-4 md:hidden md:bg-gray-100  md:hover:bg-gray-300">
                  <Search
                    className={`${
                      isMobile ? "h-5 w-5" : "h-6 w-6"
                    }    stroke-gray-600`}
                  />
                </div>
              </div>
            ) : (
              <Menu as="div" className="relative inline-block  text-left ">
                <Menu.Button
                  className={`flex items-center rounded-full p-2 transition-all duration-300 focus:bg-gray-100 focus:ring-1 focus:ring-gray-300 `}
                >
                  <DotsVertical className="h-4 w-4 " />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      {signedOutNavigation.map((item) => (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={item.path || "/"}
                              className={`${
                                active
                                  ? "bg-gray-100 text-black"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {item.icon("mr-2 h-5 w-5")}
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>

                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <Settings
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <Settings
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Archive
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <Settings
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <Settings
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Move
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <Settings
                                className="mr-2 h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                            ) : (
                              <Settings
                                className="mr-2 h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                            )}
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {sessionData?.user && (
              <Menu as="div" className="relative  flex-shrink-0  ">
                <div className="h-full">
                  <Menu.Button
                    className={`focus:ring-primary-500 ${
                      isMobile ? "ml-1 pl-2" : "px-4"
                    }   flex h-full w-full items-center justify-center  focus:right-1 md:rounded-full  md:focus:outline-none`}
                  >
                    {sessionData && (
                      <UserImage
                        image={sessionData?.user?.image ?? ""}
                        className=""
                      />
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className=" absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100  rounded-md bg-white shadow-inner ring-1 ring-black/5 focus:outline-none">
                      <div className="">
                        {/*  */}
                        <Menu.Item>
                          {({ active }) => (
                            <div className=" mb-2 flex items-center justify-start gap-x-4 border-b border-gray-200 px-4 py-4 ">
                              <div className=" mb-7 ">
                                <UserImage
                                  image={sessionData?.user?.image ?? ""}
                                  className="h-10 w-10"
                                  aria-hidden="true"
                                />
                              </div>

                              <div className="  items-center justify-center ">
                                <div className="text-sm font-medium text-gray-900">
                                  {sessionData?.user?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {sessionData?.user?.email}
                                </div>

                                <span className=" text-[14px] font-medium text-blue-700">
                                  Create a channel
                                </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>

                        {signedInNavigation.map((item) => (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (item.path === "sign-out") {
                                    void signOut();
                                  } else {
                                    void router.push(item.path || "/");
                                  }
                                }}
                                href={item.path || "/"}
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                className={cn(
                                  `${
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-900"
                                  } group flex w-full items-center px-2 py-2 text-[16px]`,
                                  item.lineAbove
                                    ? "mt-2 border-t border-gray-200"
                                    : "",
                                )}
                              >
                                {item.icon("mr-2 h-5 w-5")}
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            )}
            {!sessionData && (
              <button
                onClick={async () =>
                  await signIn("", {
                    callbackUrl: "http://localhost:3000",
                  })
                }
                className="ml-2 flex cursor-pointer items-center justify-center rounded-full border border-gray-300 px-2 py-1 text-[#065fd4] hover:border-[#def1ff] hover:bg-[#def1ff]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <p className="text-md ml-2 font-medium">Sign in</p>
              </button>
            )}
            {/* <Image
              width={34}
              height={34}
              className="rounded-full object-contain"
              src="https://lh3.googleusercontent.com/ogw/AKPQZvyIyspOA2Cr2rLJuQc9hClYeS71OR4zYlnThJc-9w=s32-c-mo"
              alt="Rounded avatar"
            /> */}
          </div>
        </div>
        {/* Menu 
        <div className="flex items-center lg:hidden">{children}</div> */}
      </div>
    </div>
  );
};

export default Navbar;
