import { cn } from "lib/untils";
import Home from "./Icons/Home";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import ClockRewind from "./Icons/ClockRewind";
import { Fragment, useEffect, useState } from "react";
import { Logo } from "./Icons/Logo";
import {
  Subscriptions,
  Folder,
  Menu,
  Youtube,
  HelpCircle,
  Trending,
  Shorts,
  Settings,
  ThumbsUp,
} from "./Icons/Icons";
import { Dialog, Transition } from "@headlessui/react";
import useIsMobile from "~/utils/useIsMobile";

interface SidebarMobileProps {
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  closeSidebar?: boolean;
}

interface NavigationItem {
  name: string;
  path?: string;
  icon: (className: string) => JSX.Element;
  current: boolean;
}

const SideBarMobile = ({
  setSidebarOpen,
  isOpen,
  closeSidebar,
}: SidebarMobileProps) => {
  const isMobile = useIsMobile();
  // console.log(isTablet);
  // console.log(isMobile);
  console.log(isOpen);

  const [isSidebarBaseVisible, setIsSidebarBaseVisible] = useState(false);
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;

  const router = useRouter();
  // const router = useRouter();
  const pathName = router.pathname;

  const desktopNavigation: NavigationItem[] = [
    {
      name: "Home",
      path: "/",
      icon: (className: string) => <Home className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Trending",
      path: "/shorts",
      icon: (className: string) => <Shorts className={className} />,
      current: router.pathname === "/shorts",
    },
    {
      name: "Subscriptions",
      path: userId ? `/${String(userId)}/profile-following` : "sign-in",
      icon: (className: string) => <Subscriptions className={className} />,
      current: router.pathname === `/${String(userId)}/profile-following`,
    },
    {
      name: "Library",
      path: userId ? `/${String(userId)}/profile-playlists` : "sign-in",
      icon: (className: string) => <Folder className={className} />,
      current: router.pathname === `/${String(userId)}/profile-playlists`,
    },
    {
      name: "History",
      path: userId ? `/playlist/history` : "sign-in",
      icon: (className: string) => <ClockRewind className={className} />,
      current: router.pathname === "/playlist/liked-videos",
    },

    {
      name: "Liked videos",
      path: userId ? `/playlist/liked-videos` : "sign-in",
      icon: (className: string) => <ThumbsUp className={className} />,
      current: router.pathname === "/playlist/liked-videos",
    },
  ];

  const desktopBaseNavigation: NavigationItem[] = [
    {
      name: "Home",
      path: "/",
      icon: (className: string) => <Home className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Shorts",
      path: "/shorts",
      icon: (className: string) => <Shorts className={className} />,
      current: router.pathname === "/shorts",
    },
    {
      name: "Subscriptions",
      path: userId ? `/${String(userId)}/profile-following` : "sign-in",
      icon: (className: string) => <Subscriptions className={className} />,
      current: router.pathname === "/${String(userId)}/profile-following",
    },
    {
      name: "Library",
      path: userId ? `/${String(userId)}/profile-playlists` : "sign-in",
      icon: (className: string) => <Folder className={className} />,
      current: router.pathname === "/${String(userId)}/profile-playlists",
    },
  ];

  useEffect(() => {
    if (pathName?.includes("watch")) setIsSidebarBaseVisible(true);
    desktopNavigation.forEach((nav) => {
      nav.current = nav.path === router.pathname;
    });
  }, [router.pathname]);

  const explore = [
    {
      name: "Trending",
      path: "/feed/trending",
      icon: (className: string) => <Trending className={className} />,
      current: router.pathname === `/feed/trending`,
    },
    {
      name: "Music",
      path: "/feed/trending",
      icon: (className: string) => <Trending className={className} />,
      current: router.pathname === `/feed/trending`,
    },
    {
      name: "Gaming",
      path: "/feed/trending",
      icon: (className: string) => <Trending className={className} />,
      current: router.pathname === `/feed/trending`,
    },
    {
      name: "News",
      path: "/feed/trending",
      icon: (className: string) => <Trending className={className} />,
      current: router.pathname === `/feed/trending`,
    },
    {
      name: "Sports",
      path: "/feed/trending",
      icon: (className: string) => <Trending className={className} />,
      current: router.pathname === `/feed/trending`,
    },
  ];
  const moreFromYoutube = [
    {
      name: "Youtube Premium",
      path: "https://www.youtube.com/premium",
      icon: (className: string) => <Youtube className={className} />,
    },
    {
      name: "Youtube Music",
      path: "https://music.youtube.com/",
      icon: (className: string) => <Youtube className={className} />,
    },
    {
      name: "Youtube Kids",
      path: "https://www.youtubekids.com",
      icon: (className: string) => <Youtube className={className} />,
    },
  ];

  const titleFooter = {
    one: [
      "Introduce",
      "Press",
      "Copyright",
      "Contact us",
      "Creators",
      "Advertise",
      "Developers",
    ],
    two: [
      "Terms",
      "Privacy",
      "Policy & SafetyHow",
      "YouTube",
      "Works test new features",
    ],
  };

  return (
    <>
      // Sidebar mobile
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          className={cn(
            isSidebarBaseVisible ? "" : "xl:hidden",
            "relative z-50 h-full ",
          )}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/80 lg:bg-none " />
          </Transition.Child>

          <div className="fixed inset-0 h-full ">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="h-full w-full max-w-[240px] transform rounded-none bg-white p-0 text-left align-middle shadow-xl transition-all">
                <div className="z-50 mx-4 flex max-w-[240px]  items-center justify-start bg-white ">
                  {/* menu */}
                  <button
                    className={cn(
                      isMobile ? "hidden" : "",
                      " cursor-pointer p-2 hover:rounded-full  hover:bg-gray-200",
                    )}
                    onClick={() => setSidebarOpen(!isOpen)}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Link
                    href={"#"}
                    aria-label="Home"
                    className="relative flex items-center justify-center md:px-4  "
                  >
                    {/* <div className="mx-3 flex sm:max-h-14 max-h-[48px] items-center"> */}
                    <div
                      className={`${
                        isMobile
                          ? "mx-0 max-h-[48px]"
                          : "mx-4 sm:max-h-14 md:mx-0"
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
                  <div></div>
                </div>

                <div className="scrollbarBase flex h-full grow flex-col  gap-y-5   overflow-y-auto  bg-white  ">
                  <nav className="my-3 flex flex-col    ">
                    <ul role="list" className="flex flex-1 flex-col   ">
                      <li className="mt-auto">
                        <ul role="list" className="">
                          {desktopNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={"#"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (item.path === "sign-in") {
                                    void signIn();
                                  } else {
                                    void router.push(item.path ?? "/");
                                  }
                                }}
                                className={cn(
                                  item.current
                                    ? " text-primary-600 bg-gray-100 font-semibold  hover:bg-gray-200 "
                                    : " hover:text-primary-600 text-gray-700 hover:bg-gray-100",
                                  "group ml-4  mr-6 flex  rounded-xl p-2 text-[16px] leading-6 ",
                                )}
                              >
                                <div className="flex w-full items-center gap-x-6 px-1 ">
                                  <div className=" ">
                                    {item.current
                                      ? item.icon(
                                          "h-5 w-5 shrink-0  stroke-fuchsia-950 fill-black ",
                                        )
                                      : item.icon(
                                          "h-5 w-5 shrink-0  stroke-gray-950  group-hover:stroke-fuchsia-950",
                                        )}
                                  </div>
                                  <p className="">{item.name} </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {/*  */}
                      <span className="mx-3 my-3 border-t   "></span>
                      <p className="ml-4  mr-6 px-3 py-1 text-base font-semibold">
                        Explore
                      </p>
                      <li className="mt-auto">
                        <ul role="list" className="">
                          {explore.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={"#"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (item.path === "sign-in") {
                                    void signIn();
                                  } else {
                                    void router.push(item.path ?? "/");
                                  }
                                }}
                                className={cn(
                                  item.current
                                    ? " text-primary-600 bg-gray-100 font-semibold  hover:bg-gray-200 "
                                    : " hover:text-primary-600 text-gray-700 hover:bg-gray-100",
                                  "group ml-4  mr-6  flex rounded-xl  p-2 text-[16px] leading-6  ",
                                )}
                              >
                                <div className="mx-1 flex w-full items-center gap-x-6 ">
                                  <div className=" ">
                                    {item.current
                                      ? item.icon(
                                          "h-5 w-5 shrink-0  stroke-fuchsia-950 fill-black ",
                                        )
                                      : item.icon(
                                          "h-5 w-5 shrink-0  stroke-gray-950  group-hover:stroke-fuchsia-950",
                                        )}
                                  </div>
                                  <p className="">{item.name} </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {/*  */}
                      <span className="mx-3 my-3 border-t   "></span>
                      <p className="mx-4 px-3 py-1 text-base font-semibold">
                        More from Youtube
                      </p>
                      {moreFromYoutube.map((item) => (
                        <li className="mx-4 mt-auto">
                          <Link
                            href={`#`}
                            className="group  flex items-center rounded-xl  p-2 text-[16px] leading-6 hover:bg-gray-100  "
                          >
                            {item.icon(
                              "h-5 w-5 shrink-0  stroke-fuchsia-950 fill-black ml-1 mr-6  ",
                            )}
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <span className="mx-3 my-3 border-t   "></span>
                      <li className="mt-auto">
                        <Link
                          href={`#`}
                          className="group ml-4  mr-6  flex rounded-xl p-2 text-[16px] leading-6 hover:bg-gray-100  "
                        >
                          <div className="mx-1 flex w-full items-center gap-x-6">
                            <Settings className="h-5 w-5 shrink-0 stroke-gray-500 group-hover:stroke-fuchsia-950" />
                            <p className={cn(closeSidebar ? "hidden" : "")}>
                              Settings
                            </p>
                          </div>
                        </Link>

                        <Link
                          href={`#`}
                          className="group ml-4  mr-6  flex rounded-xl p-2 text-[16px] leading-6 hover:bg-gray-100  "
                        >
                          <div className="mx-1 flex w-full items-center gap-x-6">
                            <Settings className="h-5 w-5 shrink-0 stroke-gray-500 group-hover:stroke-fuchsia-950" />
                            <p className={cn(closeSidebar ? "hidden" : "")}>
                              Report history
                            </p>
                          </div>
                        </Link>
                        <Link
                          href={`#`}
                          className="group ml-4  mr-6  flex rounded-xl p-2 text-[16px] leading-6 hover:bg-gray-100  "
                        >
                          <div className="mx-1 flex w-full items-center gap-x-6">
                            <HelpCircle className="h-5 w-5 shrink-0 stroke-gray-500 group-hover:stroke-fuchsia-950" />
                            <p className={cn(closeSidebar ? "hidden" : "")}>
                              Help
                            </p>
                          </div>
                        </Link>
                        <Link
                          href={`#`}
                          className="group ml-4  mr-6  flex rounded-xl p-2 text-[16px] leading-6 hover:bg-gray-100  "
                        >
                          <div className="mx-1 flex w-full items-center gap-x-6">
                            <Settings className="h-5 w-5 shrink-0 stroke-gray-500 group-hover:stroke-fuchsia-950" />
                            <p className={cn(closeSidebar ? "hidden" : "")}>
                              Send feedback
                            </p>
                          </div>
                        </Link>
                      </li>

                      <span className="mx-3 my-4 border-t  "></span>
                      <li className="mx-6 mt-auto flex flex-wrap gap-x-2 text-sm ">
                        {titleFooter.one.map((title) => (
                          <Link href={`#`} key={title}>
                            {title}
                          </Link>
                        ))}
                      </li>
                      <li className="mx-6  mt-auto flex flex-wrap gap-x-2 text-sm ">
                        {titleFooter.two.map((title) => (
                          <Link href={`#`} key={title}>
                            {title}
                          </Link>
                        ))}
                      </li>
                    </ul>
                  </nav>

                  <div className="mx-6  w-fit pb-[70px]">
                    <p className=" text-sm text-gray-500">© 2023 Google LLC</p>
                  </div>
                </div>

                {/*  */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SideBarMobile;
