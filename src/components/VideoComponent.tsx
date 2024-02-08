import Link from "next/link";
import { Thumbnail } from "./Components";
import Image from "next/image";
// import moment from "moment";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Settings, HelpCircle, DotsVertical } from "./Icons/Icons";
import SliderTabs from "./SliderTabs";
import { cn, timeFormat } from "lib/untils";

interface SettingItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

const settingsItems: SettingItem[] = [
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
interface VideoComponentProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    description?: string;
    createdAt: Date;
    views: number;
  }[];
  users: {
    image: string;
    name: string;
  }[];
  refetch?: () => Promise<unknown>;
  isLoading?: boolean;
}

export const MuliColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  // isLoading,
}) => {
  // console.log(videos);
  // console.log(users);
  // console.log(isLoading);

  return (
    // <div className="grid h-full grid-cols-1 gap-y-8 overflow-hidden sm:mx-4 sm:grid-cols-2 md:gap-x-1 md:gap-y-8 lg:grid-cols-3    xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-1 3xl:grid-cols-5">
    <>
      {/* {isLoading && <CardSkeleton cards={30} />} */}
      <SliderTabs isFixed className="top-12 xs:top-14  md:top-14" />

      {videos?.map((video, index) => {
        const user = users[index];
        if (!user) {
          return null;
        }
        return (
          <Link
            href={`/watch/${video.id}`}
            className="flex flex-col gap-3"
            key={video?.id}
          >
            <div className="w-full space-y-5 rounded-md p-2 ">
              <div className="flex flex-col gap-y-2">
                <div className="relative rounded-xl bg-gray-600  py-28 md:py-28 lg:py-[88px]">
                  {/* <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover w-full" /> */}
                  <Thumbnail
                    thumbnailUrl={video.thumbnailUrl}
                    title={video.title}
                  />
                </div>
                <div className="flex gap-x-2  ">
                  {/* <div className="rounded-full bg-gray-600 p-6"> */}
                  <UserImage image={user?.image} className="h-8 w-8 p-4" />
                  {/* </div> */}
                  <div className="flex w-full flex-col gap-y-2 lg:gap-y-1">
                    <div className="max-w-[90%] rounded-sm  ">
                      <p className="line-clamp-2 font-semibold leading-5">
                        {video.title}
                      </p>
                    </div>
                    <div className="max-w-[70%] rounded-sm">
                      <p className="text-md whitespace-nowrap leading-5 text-gray-500">
                        {user?.name}
                      </p>
                      <div className="flex items-center text-gray-500 ">
                        <p className="whitespace-nowrap text-sm leading-5 ">
                          {video?.views <= 1
                            ? `${video?.views} view`
                            : `${video?.views} views`}
                        </p>
                        <div className="ml-1 flex items-center gap-x-1 leading-5">
                          <span>•</span>
                          <p className="whitespace-nowrap text-sm leading-5">
                            {timeFormat(video.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
    // </div>
  );
};

export const SingleColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
}) => {
  // console.log(videos);
  const url = `/watch/`;
  return (
    <>
      <div className="mx-1 mt-[65px] flex h-full w-full justify-center pb-2  ">
        <div className="mb-28 flex h-full w-full max-w-[1096px] flex-col gap-y-4">
          <SliderTabs isFixed className="top-14 md:top-14" />

          {videos?.map((video, index) => {
            const user = users[index];
            if (!user) {
              return null;
            }
            return (
              <Link
                href={url + video.id}
                // className="flex flex-col gap-3"
                key={video?.id}
              >
                <div className="mx-4 h-full w-full space-x-5 space-y-5  rounded-md ">
                  <div className="flex  w-full  gap-6 md:flex-row ">
                    <div className="relative aspect-[16/9] rounded-xl bg-gray-600  py-[68px]  sm:aspect-[2/1] md:py-[86px] lg:py-[90px]">
                      {/* <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover w-full" /> */}
                      <Thumbnail
                        thumbnailUrl={video.thumbnailUrl}
                        title={video.title}
                      />
                    </div>
                    <div className="group relative flex  h-full w-full gap-x-0">
                      <div className="flex  flex-col gap-y-2 pr-4 lg:gap-y-1">
                        <div className=" rounded-sm  ">
                          <p className="line-clamp-2 font-semibold leading-5">
                            {video.title}
                          </p>
                        </div>
                        <div className=" rounded-sm">
                          <div className="flex items-center text-gray-500 ">
                            <p className="whitespace-nowrap text-sm leading-5 ">
                              {video?.views <= 1
                                ? `${video?.views} view`
                                : `${video?.views} views`}
                            </p>
                            <div className="ml-1 flex items-center gap-x-1 leading-5">
                              <span>•</span>
                              <p className="whitespace-nowrap text-sm leading-5">
                                {timeFormat(video.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-2 py-4">
                            {/* <div className="rounded-full bg-gray-600 p-6"> */}
                            <UserImage
                              image={user?.image}
                              className="h-6 w-6"
                            />
                            {/* </div> */}
                            <p className="text-md whitespace-nowrap leading-5 text-gray-500">
                              {user?.name}
                            </p>
                          </div>

                          <p className="text-md  line-clamp-1 max-w-[90%] leading-5 text-gray-500">
                            {video?.description}
                          </p>
                        </div>
                      </div>
                      {/* Dot  ... */}
                      <div
                        onClick={(e) => e.preventDefault()}
                        className="absolute -top-3 right-0 hidden p-3 group-hover:block  "
                      >
                        <Menu
                          as="div"
                          className="relative inline-block  text-left   "
                        >
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                              <div className="px-1 py-1 ">
                                {settingsItems.map((item) => (
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const SmSingleColumnSidebarVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
  refetch,
}) => {
  // console.log(videos);
  // console.log(users);
  // console.log(refetch);

  return (
    // <div className="grid h-full grid-cols-1 gap-y-8 overflow-hidden sm:mx-4 sm:grid-cols-2 md:gap-x-1 md:gap-y-8 lg:grid-cols-3    xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-1 3xl:grid-cols-5">
    <>
      {/* {isLoading && <CardSkeleton cards={30} />} */}
      {/* <SliderTabs isFixed={false} /> */}
      {videos?.map((video, index) => {
        const user = users[index];
        if (!user) {
          return null;
        }
        return (
          <Link href={`/watch/${video.id}`} key={video.id} onClick={refetch}>
            <div className="relative isolate my-3 flex flex-col gap-4 rounded-2xl   lg:flex-row ">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-40 lg:shrink-0 xl:w-52">
                <Thumbnail thumbnailUrl={video.thumbnailUrl} />
              </div>
              <div className=" flex w-full flex-col items-start overflow-hidden text-xs  max-lg:mx-2">
                <VideoTitle
                  title={video.title}
                  limitHeight={true}
                  limitSize={true}
                />
                <div
                  className={cn(
                    "flex  flex-row items-center gap-x-2 xs:flex-col xs:items-start ",
                  )}
                >
                  <UserName name={user.name || ""} />
                  <VideoInfo views={video.views} createdAt={video.createdAt} />
                </div>
              </div>
            </div>
            {/* TODO: More for video sidebar */}
            {/* <div className="absolute top-0 right-0 mx-0">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-xs">
                  <DotsVertical className="w-5 h-5" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </Link>
        );
      })}
    </>
    // </div>
  );
};

export function VideoTitle({
  title,
  limitHeight,
  limitSize,
}: {
  title: string;
  limitHeight?: boolean;
  limitSize?: boolean;
}) {
  return (
    <h1
      className={`line-clamp-2 max-w-md font-semibold leading-5 text-gray-900 group-hover:text-gray-600 ${
        limitSize ? "text-base" : "text-lg"
      } ${limitHeight ? "max-h-12 w-full overflow-hidden" : ""}`}
    >
      {title}
    </h1>
  );
}

export function VideoDescription({ description }: { description: string }) {
  return (
    <p className="mt-2 h-5 max-w-md overflow-hidden text-sm leading-6 text-gray-600">
      {description}
    </p>
  );
}
export function VideoInfo({
  views,
  createdAt,
}: {
  createdAt: Date | string;
  views: number;
}) {
  return (
    <div className=" flex max-h-6 items-start overflow-hidden text-sm">
      <p className=" text-gray-600">
        {views}
        <span> views</span>
      </p>
      <li className="hidden px-2 text-sm text-gray-500 xs:block ">•</li>
      <p className=" hidden text-gray-600 xs:block">{timeFormat(createdAt)}</p>
    </div>
  );
}

export const UserImage = ({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={`relative  rounded-full border  border-gray-300 shadow-inner  ${
        className ? className : "h-6 w-6 md:h-8 md:w-8"
      }`}
    >
      <Image
        src={image || "/profile.png"}
        className="absolute inset-0 rounded-full  bg-gray-200 object-cover"
        alt=""
        fill
      />
    </div>
  );
};

export function UserName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        className ? className : " font-semibold leading-6 text-gray-500",
        "max-h-6 overflow-hidden ",
      )}
    >
      {name}
    </p>
  );
}
