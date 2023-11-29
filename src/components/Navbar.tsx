import Link from "next/link";
import { Logo } from "./Icons/Logo";
import MenuIcon from "./Icons/Menu";
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
import Button from "./Buttons/Button";

interface NavbarProps {
  children: React.ReactNode;
}

interface NavigationItem {
  icon: (className: string) => JSX.Element;
  path: string;
  lineAbove: boolean;
}

const Navbar = ({ children }: NavbarProps) => {
  const [SearchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const router = useRouter();

  const { data: sessionData } = useSession();

  const handleSearch = async () => {
    try {
      await router.push({
        pathname: "/searchPage",
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
    <div className="fixed z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-visible">
      <div className="mx-auto flex max-w-full px-6 lg:px-4 xl:grid xl:grid-cols-12">
        <div className="flex flex-shrink-0 items-center lg:static xl:col-span-2">
          <div className="cursor-pointer px-2  hover:rounded-full hover:bg-gray-200">
            <MenuIcon className="h-6 w-6" />
          </div>
          <Link
            href={"#"}
            aria-label="Home"
            className="relative flex items-center justify-center px-4"
          >
            <div className="">
              <Logo className="relative" />
            </div>
            <p className="absolute -right-[2px] top-[10px] font-mono text-[11px] tracking-wider text-gray-800">
              VN
            </p>
          </Link>
        </div>
        {/* input search */}
        <div className="w-full min-w-0 flex-1 lg:px-0 xl:col-span-8">
          <div className="mx-auto flex h-full w-[60%] items-center justify-center px-6 lg:max-w-none xl:px-0">
            <div className="w-full  ">
              <div></div>
              <label htmlFor="search" className="sr-only ">
                Search
              </label>

              <div className="relative flex items-center ">
                {isSearch && (
                  <div className=" pointer-events-none inset-y-0 start-0 flex grid-rows-2 items-center ps-3 md:absolute">
                    <Search className=" h-4 w-4 stroke-gray-600" />
                  </div>
                )}

                <div className="absolute right-36">
                  <Keyboard className=" h-4 w-4 cursor-pointer opacity-75 hover:opacity-100" />
                </div>
                <input
                  id="search"
                  name="search"
                  className=" hidden w-full  rounded-bl-full rounded-tl-full  py-2 pl-10 pr-10   tracking-tighter text-gray-900 shadow-inner shadow-gray-200 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-lg placeholder:text-gray-500   focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 md:block "
                  placeholder="Search"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  type="search"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchInput(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

                <button className=" right-0 -ml-[1px] rounded-br-full rounded-tr-full  bg-gray-100  px-6 py-3 ring-1    ring-inset ring-gray-300 placeholder:text-gray-400  hover:bg-gray-200  hover:ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 md:block ">
                  <Search className=" h-4 w-4  stroke-gray-600" />
                </button>

                <div className="ml-4 cursor-pointer rounded-full bg-gray-100 px-3  py-3 hover:bg-gray-300">
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
        <div className=" col-span-2 mx-6 flex items-center justify-end  ">
          {sessionData?.user?.email ?? "UnKnow"}
          <div className="m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2 ">
            {sessionData ? (
              //  {/* TODO:icon video */}
              <div className="flex gap-x-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                >
                  <path d="m22 8-6 4 6 4V8Z" />
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
                {/* TODO: Icon bell notification */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
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
                            Edit
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
                            Duplicate
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
            <Menu as="div" className="relative ml-5 flex-shrink-0">
              <div>
                <Menu.Button className="focus:ring-primary-500 flex rounded-full focus:outline-none focus:ring-1">
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
                  <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100  rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="">
                      {/* <Menu.Item as={"div"}>
                        {({ active }) => (
                          <div 
                          className=" flex items-center justify-start gap-x-4 py-4 px-4 "
                       
                          >
                             <div className=" mb-7 ">
                                <UserImage
                                  image={sessionData?.user?.image ?? ""}
                                  className="w-10 h-10"
                                  aria-hidden="true"
                                />
                             </div>

                            <div className="  justify-center items-center ">
                              <div className="text-sm font-medium text-gray-900">
                                {sessionData?.user?.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {sessionData?.user?.email}
                              </div>

                              <span className=" text-blue-700 font-medium text-[14px]">Create a channel</span>
                            </div>
                          </div>

                       
                        )}
                        
                      </Menu.Item> */}

                      {/*  */}
                      <Menu.Item>
                        {({ active }) => (
                          <div className=" flex items-center justify-start gap-x-4 px-4 py-4 ">
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

                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={async () => await signOut()}>
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>

                {!sessionData && (
                  <button
                    onClick={async () =>
                      await signIn("google", {
                        callbackUrl: "http://localhost:3000",
                      })
                    }
                    className="flex cursor-pointer rounded-full border border-gray-300 px-2 py-1 text-[#065fd4] hover:border-[#def1ff] hover:bg-[#def1ff]"
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
              </div>
            </Menu>

            {/* <Image
              width={34}
              height={34}
              className="rounded-full object-contain"
              src="https://lh3.googleusercontent.com/ogw/AKPQZvyIyspOA2Cr2rLJuQc9hClYeS71OR4zYlnThJc-9w=s32-c-mo"
              alt="Rounded avatar"
            /> */}
          </div>
        </div>
        {/* Menu  */}
        <div className="flex items-center lg:hidden">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
