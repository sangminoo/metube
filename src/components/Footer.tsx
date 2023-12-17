import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Home,
  Library,
  PlusCircle,
  Shorts,
  Subscriptions,
} from "./Icons/Icons";

interface NavigationItem {
  name: string;
  path?: string;
  icon: (className: string) => JSX.Element;
  current: boolean;
}

const Footer = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  const tabsIsSignedIn: NavigationItem[] = [
    {
      name: "Home",
      path: "/",
      icon: (className: string) => <Home className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Home",
      path: "/",
      icon: (className: string) => <Shorts className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "",
      path: undefined,
      icon: (className: string) => <PlusCircle className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Subscriptions",
      path: "/",
      icon: (className: string) => <Subscriptions className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Library",
      path: "/",
      icon: (className: string) => <Library className={className} />,
      current: router.pathname === "/",
    },
  ];
  const tabsIsSignedOut: NavigationItem[] = [
    {
      name: "Home",
      path: "/",
      icon: (className: string) => <Home className={className} />,
      current: router.pathname === "/",
    },
    {
      name: "Shorts",
      path: "/",
      icon: (className: string) => <Shorts className={className} />,
      current: router.pathname === "/",
    },

    {
      name: "Subscriptions",
      path: "/",
      icon: (className: string) => <Library className={className} />,
      current: router.pathname === "/",
    },
  ];

  const tabs = userId ? tabsIsSignedIn : tabsIsSignedOut;
  return (
    <div className="fixed bottom-0 z-40 mx-auto h-12 w-full border-t-2 bg-white ">
      <div className="flex h-full w-full items-center justify-evenly   ">
        {tabs.map((tab) => (
          <Link href={tab.path ?? "/"} className="w-full"
          onClick={(e) => {
            e.preventDefault();
            if (tab.path === "sign-in") {
              void signIn();
            } else {
              void router.push(tab.path ?? "/");
            }
          }}
          >
            <div className="flex flex-col items-center justify-center ">
              <div>
                {tab.current
                  ? tab.icon("w-7 h-7 fill-black")
                  : tab.icon("w-7 h-7 ")}
              </div>
              <p className="text-[11px]">{tab.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
