import { Popover } from "@headlessui/react";
import Image from "next/image";

interface DetailPopoverProps {
  video: {
    title: string;
    views: number;
    comments: number;
    likes: number;
    dislikes: number;
    thumbnailUrl: string;
  };
}

export const DetailPopover = ({
  video, //   comments,
  //   likes,
} //   dislikes,
//   views,
//   title,
//   image
: DetailPopoverProps) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>
            {" "}
            <button className="btn btn-ghost btn-xs">Details</button>
          </Popover.Button>

          <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Popover.Panel
            className={
              "absolute inset-0  w-full h-fit pb-3 items-center justify-center rounded-md bg-gray-50 "
            }
          >
            <h2 className="w-full p-2 text-xl ">
              Details video:{" "}
              <span className="text-blue-500">{video.title}</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Video</th>
                    <th>Restrictions</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Likes (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="bg-base-200 ">
                    <th></th>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            src={video?.thumbnailUrl ?? ""}
                            alt={video?.title}
                            fill
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">No</td>
                    <td className="font-medium">{video.views}</td>
                    <td className="font-medium">{video.comments}</td>
                    <td>
                      <p className="font-medium">
                        {(video.likes / (video.likes + video.dislikes)) * 100}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {video.likes} likes
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
