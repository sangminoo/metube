import Image from "next/image";
import PublishedButton from "./Buttons/PublishedButton";
import { formatDate } from "lib/untils";
import { DetailPopover } from "./DetailPopover";
import { useState } from "react";
import {
  CommentButton,
  DeleteButton,
  EditButton,
  YoutubeButton,
} from "./Buttons/Buttons";
import DotsVertical from "./Icons/DotsVertical";

interface TableProps {
  videos: {
    id: string;
    title: string | null;
    thumbnailUrl: string | null;
    description: string | null;
    likes: number;
    dislikes: number;
    views: number;
    comments: number;
    createdAt: Date;
  }[];
  refetch: () => Promise<unknown>;
}

const Table = ({ videos, refetch }: TableProps) => {
  // console.log(title);
  // console.log(videos);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Video</th>
              <th>View Mode</th>
              <th>Day</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {videos?.map((video, index) => (
              <tr
                key={video?.id}
                className="hover:bg-gray-50"
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
              >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className=" flex min-w-[290px] max-w-[510px] items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={video?.thumbnailUrl ?? ""}
                          alt="Avatar Tailwind CSS Component"
                          fill
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="font-base line-clamp-1">
                        {video?.title}
                      </div>
                      <div className="line-clamp-2 text-sm leading-4 opacity-50">
                        {video?.description}
                      </div>
                      {/* hover  show extra info */}
                      {hoveredRowIndex === index && (
                        <div className="absolute -bottom-4 w-full bg-gray-50 py-2">
                          <div className="flex min-w-[290px] max-w-[510px] items-center gap-3">
                            <EditButton video={video} refetch={refetch} />
                            <CommentButton
                              videoId={video?.id ?? ""}
                              refetch={refetch}
                            />
                            <YoutubeButton
                              videoId={video?.id ?? ""}
                              refetch={refetch}
                            />
                            <DeleteButton
                              videoId={video?.id ?? ""}
                              refetch={refetch}
                            />
                            <DotsVertical className=" h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="flex w-[120px] flex-col items-center justify-center gap-y-2 ">
                  <PublishedButton video={video} />
                </td>
                <td>
                  <span>{formatDate(video.createdAt.toString())}</span>{" "}
                  <p className="text-xs text-gray-500">Upload date</p>
                </td>
                <th>
                  <DetailPopover
                    video={{
                      thumbnailUrl: video.thumbnailUrl ?? "",
                      title: video.title ?? "",
                      comments: video.comments ?? 0,
                      dislikes: video.dislikes ?? 0,
                      views: video.views ?? 0,
                      likes: video.likes ?? 0,
                    }}
                  />
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
};

export default Table;
