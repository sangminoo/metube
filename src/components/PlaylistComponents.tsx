import moment from "moment";
import Link from "next/link";
import {
  VideoDescription,
  SmSingleColumnSidebarVideo,
  Thumbnail,
  UserImage,
} from "./Components";
import Head from "next/head";
import { ArrowDown, Edit, Lock, Playlists, ThumbsDown } from "./Icons/Icons";
import ButtonArrange from "./Buttons/ButtonArrange";
import { timeFormat } from "lib/untils";

//
interface PlaylistPageProps {
  playlist: {
    id: string;
    title: string;
    description: string;
    videoCount: number;
    playlistThumbnail: string;
    createdAt: Date;
  };
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: Date;
    views: number;
  }[];
  authors: {
    id: string;
    name: string;
    image: string;
  }[];
  user: {
    id: string;
    image: string;
    name: string;
    followers: number;
  };
}

export const PlaylistPage: React.FC<PlaylistPageProps> = ({
  playlist,
  videos,
  authors,
  user,
}) => {
  if (!playlist || !videos || !authors || !user) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{playlist?.title ? playlist?.title + " - VidChill" : ""}</title>
        <meta name="description" content={playlist?.description || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto gap-2 lg:flex ">
        <div className="flex w-full md:pr-6 lg:w-1/2 lg:px-0 lg:pl-6">
          {/*  */}
          <div
            className={`flex min-h-max w-full flex-col rounded-xl bg-gradient-to-r from-stone-100 to-green-100 px-6 py-8 md:flex md:h-72  md:p-6 lg:fixed lg:h-[85vh] lg:w-[360px] `}
          >
            <div className="flex flex-col justify-between gap-x-6 md:mx-auto md:flex-row lg:flex-col">
              <div className=" ">
                <div className="relative mx-auto h-[176px] w-[310px] md:mx-0 lg:mx-0 lg:shrink-0">
                  <Thumbnail thumbnailUrl={playlist.playlistThumbnail ?? ""} />
                </div>
              </div>

              <div>
                <div className="my-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {playlist.title || ""}
                  </h2>
                  <Edit className="h-5 w-5" />
                </div>
                <p> {user.name || ""}</p>
                <span className="flex items-center gap-x-1">
                  Public <ArrowDown className="h-3 w-3" />
                </span>
                <div className="flex items-center gap-x-2 text-gray-500">
                  <p>{videos.length} videos</p>
                  <p>106 views</p>
                  <p>Update {timeFormat(playlist.createdAt)}</p>
                </div>
                <div className="flex items-center justify-between">
                  {playlist.description
                    ? playlist.description
                    : "No description information available"}

                  <Edit className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-4 flex items-center justify-between gap-x-6">
              <button className="btn btn-neutral btn-sm rounded-full px-16 sm:px-28 lg:px-12">
                View all
              </button>
              <button className="btn btn-neutral btn-sm rounded-full px-16 sm:px-28 lg:px-12">
                Mix all
              </button>
            </div>
          </div>
          {/* <SinglePlaylist
            playlist={{
              id: playlist?.id || "",
              title: playlist?.title || "",
              videoCount: playlist?.videoCount || 0,
              playlistThumbnail: playlist?.playlistThumbnail || "",
              createdAt: playlist?.createdAt || new Date(),
            }}
          />
          <VideoDescription description={playlist.description || ""} />
          <div className="flex flex-row  place-content-between gap-x-4 ">
            <Link href={`/${user.id}/ProfileVideos`} key={user.id}>
              <div className="mt-4 flex flex-row gap-2 ">
                <UserImage image={user.image || ""} />
                <div className="flex flex-col ">
                  <p className="w-max text-sm font-semibold leading-6 text-gray-900">
                    {user.name || ""}
                  </p>
                  <p className=" text-sm text-gray-600">
                    {user.followers}
                    <span> Followers</span>
                  </p>
                </div>
              </div>
            </Link>
          </div> */}
        </div>
        <div className="gap-4 lg:w-full lg:px-0 lg:pl-10 xl:pl-0  ">
          <ButtonArrange />

          <SmSingleColumnSidebarVideo
            videos={videos
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((video) => ({
                id: video?.id || "",
                title: video?.title || "",
                thumbnailUrl: video?.thumbnailUrl || "",
                createdAt: video?.createdAt || new Date(),
                views: video?.views || 0,
              }))}
            users={authors.map((author) => ({
              id: author?.id || "",
              name: author?.name || "",
              image: author?.image || "",
            }))}
          />

          
        </div>
      </main>
    </>
  );
};

export function MultiColumnPlaylist({
  playlists,
  isUser,
}: {
  playlists: {
    id: string;
    title: string;
    description?: string;
    videoCount: number;
    playlistThumbnail: string;
    createdAt: Date;
  }[];
  isUser?: boolean;
}) {
  const playlistFilter = playlists?.filter(
    (playlist) => playlist.videoCount > 0,
  );

  return (
    <div className=" mx-auto grid grid-cols-2 gap-x-4 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:mx-1 xl:max-w-none xl:grid-cols-6 2xl:mx-1 2xl:max-w-none 2xl:grid-cols-6  ">
      {playlistFilter?.map((playlist) => (
        <Link
          href={`/playlist/${playlist.id}`}
          className="flex flex-col items-start justify-between hover:bg-gray-100"
          key={playlist.id}
        >
          <SinglePlaylist playlist={playlist} isUser={isUser}>
            {/* <p className="text-regular mt-2 max-h-12 overflow-hidden text-gray-600">
              {playlist?.description}
            </p> */}
          </SinglePlaylist>
        </Link>
      ))}
    </div>
  );
}
export function SinglePlaylist({
  playlist,
  children,
  isUser,
}: {
  playlist: {
    id: string;
    title: string;
    videoCount: number;
    playlistThumbnail: string;
    createdAt: Date;
  };
  isUser?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="relative py-16">
          <Thumbnail thumbnailUrl={playlist?.playlistThumbnail} />
          <Thumbnail
            thumbnailUrl={playlist?.playlistThumbnail}
            title={playlist.title}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 max-h-32 rounded-b-2xl bg-transparent bg-opacity-60 ">
          <div className="mb-1">
            <div className="mt-2 flex  justify-end   text-sm font-semibold text-white">
              <span className="badge badge-lg rounded-md border-none bg-black/80 font-medium text-white ">
                <Playlists className="h-5 w-5 text-white" />{" "}
                {playlist.videoCount} videos
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg">
        <div className="items-top relative mt-2 flex gap-x-4 ">
          <div className=" w-full ">
            <div className=" w-100 flex flex-col ">
              <h3 className="h-auto w-full text-base font-semibold text-gray-900 group-hover:text-gray-600">
                {playlist.title}
              </h3>
              {isUser && (
                <div className="mt-1 flex items-start gap-x-2  text-sm">
                  {moment(playlist.createdAt).fromNow().includes("hour") && (
                    <p className="text-sm">Update today</p>
                  )}
                  {moment(playlist.createdAt).fromNow().includes("year") && (
                    <div className="badge badge-ghost">
                      <span className="flex items-center gap-x-1 text-gray-600">
                        <Lock className="h-3 w-3" /> Private
                      </span>
                    </div>
                  )}
                  {moment(playlist.createdAt).fromNow().includes("day") && (
                    <p> Update {moment(playlist.createdAt).fromNow()}</p>
                  )}
                </div>
              )}
              <p>View full playlist</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
