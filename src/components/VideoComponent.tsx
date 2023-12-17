import Link from "next/link";
import { Thumbnail } from "./Components";
import Image from "next/image";

interface VideoComponentProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Date;
    views: number;
  }[];
  users: {
    image: string;
    name: string;
  }[];
  refetch?: () => Promise<unknown>;
}

export const MuliColumnVideo: React.FC<VideoComponentProps> = ({
  videos,
  users,
}) => {
  // console.log(videos);

  return (
    <>
      {videos.map((video, index) => {
        const user = users[index];
        if (!user) {
          return null;
        }
        return (
          <Link
            href={`watch?v=${video.id}`}
            className="flex flex-col gap-3"
            key={video?.id}
          >
            <div className="w-full space-y-5 rounded-md p-2">
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
                  <UserImage image={user?.image} className="p-4" />
                  {/* </div> */}
                  <div className="flex w-full flex-col gap-y-2 lg:gap-y-1">
                    <div className="max-w-[90%] rounded-sm  ">
                      <p className="line-clamp-2 font-semibold leading-5">
                        {video.title}
                      </p>
                    </div>
                    <div className="max-w-[70%] rounded-sm">
                      <p className="whitespace-nowrap text-md text-gray-500 leading-5">
                        {user?.name}
                      </p>
                      <div className="flex items-center text-gray-500 ">
                        <p className="whitespace-nowrap text-sm leading-5 ">
                          {video?.views > 1
                            ? `${video?.views} view`
                            : `${video?.views} views`}
                        </p>
                        <div className="ml-1 flex items-center gap-x-1 leading-5">
                          <span>•</span>
                          <p className="whitespace-nowrap text-sm leading-5">
                            {/* {video?.createdAt} */}3 days ago
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
  );
};

export const UserImage = ({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={`relative h-6 w-6 rounded-full border  border-gray-300 shadow-inner md:h-8 md:w-8 ${className}`}
    >
      <Image
        src={image || "/profile.png"}
        className="absolute inset-0 rounded-full bg-gray-200 object-cover"
        alt=""
        fill
      />
    </div>
  );
};
