import { cn, timeFormat } from "lib/untils";
import { UserImage, UserName } from "./Components";
import Like from "./Icons/Like";
import Unlike from "./Icons/Unlike";
import UserHeart from "./UserHeart";
import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FaceSmile from "./Icons/FaceSmile";
import useAutoSizeTextArea from "~/utils/useAutoSizeTextArea";
import { api } from "~/utils/api";
import DotsVertical from "./Icons/DotsVertical";
import Edit from "./Icons/Edit";
import Trash from "./Icons/Trash";
import Plus from "./Icons/Plus";
import { Playlist } from "@prisma/client";
import { ExecOptionsWithStringEncoding } from "child_process";

interface Comment {
  comment: {
    id: string;
    message: string;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    image: string | null;
    handle: string | null;
  };
}

interface NamePlaylistSectionProps {
  userVideoId?: string;
  userVideoImageUrl?: string;
  videoId: string;
  comments?: Comment[];
  refetchPlaylists: () => Promise<unknown>;
  playlists: Playlist[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NamePlaylistSection = ({
  userVideoId,
  userVideoImageUrl,
  videoId,
  //   comments,
  playlists,
  refetchPlaylists,
  setIsOpen,
}: NamePlaylistSectionProps) => {
  // this value is comment from user
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [isComment, setIsComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPlaylistId, setLastPlaylistId] = useState("");

  // Thêm state để theo dõi trạng thái loading của việc xóa comment
  const [deleteCommentLoading, setDeleteCommentLoading] = useState<
    string | null
  >(null);
  //   const [commentLoading, setCommentLoading] = useState<Array<boolean>>(
  //     Array(comments.length).fill(false),
  //   );
  // console.log(commentLoading);

  const addCommentMutation = api.comment.addComment.useMutation();
  const deleteCommentMutation = api.comment.deleteComment.useMutation();
  const { data: sessionData } = useSession();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoSizeTextArea("title-input", textAreaRef.current, newPlaylistName);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPlaylistName(value);
  };

  console.log(playlists.length);

  //   if (!videoId) {
  //     return <div>Loading...</div>;
  //   }
  // console.log(videoId);

  const createPlaylistMutation = api.playlist.addPlaylist.useMutation();
  const addVideoToPlaylistMutation =
    api.playlist.addVideoToPlaylist.useMutation();

  const addNamePlaylist = (input: {
    title: string;
    userId: string;
    // description: string;
  }) => {
    // console.log(input);
    // setIsLoading(true);
    //   const newCommentLoading = [...commentLoading];

    // console.log(...commentLoading);
    // console.log(newCommentLoading);

    //   newCommentLoading.unshift(true); // Set loading for the new comment
    // console.log(newCommentLoading);

    //   setCommentLoading(newCommentLoading);
    // console.log(newCommentLoading);
    console.log(input);
    void refetchPlaylists();

    // setIsOpen(false);

    createPlaylistMutation.mutate(input, {
      onSuccess: (newPlaylist) => {
        console.log(newPlaylist.id);
        setLastPlaylistId(newPlaylist.id);

        setIsOpen(false);
        setIsComment(false);
        setNewPlaylistName("");

        void refetchPlaylists();

        // setNewPlaylistName("");
        // setIsComment(false);
        //   setCommentLoading(Array(comments.length).fill(false)); // Reset loading for all comments
        // setIsLoading(false);
      },
      onError: () => {
        // Handle error if needed
        //   setCommentLoading(Array(comments.length).fill(false)); // Reset loading for all comments
        // setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    // console.log(lastPlaylistId);

    if (lastPlaylistId) {
      addVideoToPlaylist({
        playlistId: lastPlaylistId,
        videoId: videoId,
      });
    }
  }, [lastPlaylistId]);
  const addVideoToPlaylist = (input: {
    playlistId: string;
    videoId: string;
  }) => {
    // console.log(input);

    addVideoToPlaylistMutation.mutate(input, {
      onSuccess: () => {
        void refetchPlaylists();
      },
    });
  };

  // console.log(playlists);
  // console.log(newPlaylistName);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNamePlaylist({
      title: newPlaylistName,
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      userId: sessionData?.user.id as string,
    });
  };

  // const deleteComment = (input: {
  //   videoId: string;
  //   userId: string;
  //   commentId: string;
  // }) => {
  //   const cmtId = input.commentId;
  //   console.log(cmtId);

  //   setDeleteCommentLoading(cmtId);
  //   deleteCommentMutation.mutate(input, {
  //     onSuccess: () => {
  //       void refetch();
  //       setDeleteCommentLoading(null);
  //     },
  //   });
  // };

  return (
    <>
      <div className="w-full">
        <div className="flex w-full  ">
          <form onSubmit={handleOnSubmit} className="  flex flex-1 flex-col ">
            <button
              className="relative mb-2.5 h-full w-full min-w-[200px]"
              type="button"
              onClick={
                sessionData
                  ? () => {
                      setIsComment(true);
                    }
                  : () => signIn()
              }
            >
              {!isComment && (
                <div className="relative -bottom-4 mx-3">
                  <span className="flex gap-x-4">
                    <Plus className="h-5 w-5" />
                    <p className="mx-2">Create a new playlist</p>
                  </span>
                </div>
              )}
              {isComment && (
                <>
                  <input
                    placeholder="Enter playlist name..."
                    onChange={(e) => handleOnChange(e)}
                    className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-2.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
                  />
                  <label className="after:content[' '] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none  absolute -top-2.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent">
                    Name
                  </label>
                </>
              )}
            </button>
            {isComment && (
              <div className="flex w-full flex-col items-end justify-end ">
                <p className="-mt-2 text-xs ">0/150</p>
                <div className="mt-2  flex justify-end gap-x-3">
                  <button
                    className="rounded-3xl px-3 py-[6px] hover:bg-gray-300"
                    type="button"
                    onClick={() => {
                      setIsComment(false);
                      setNewPlaylistName("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                    disabled={!newPlaylistName || !newPlaylistName.trim()}
                    className={cn(
                      "rounded-3xl bg-blue-600 px-3  py-[6px] text-white disabled:bg-gray-200 disabled:text-gray-500 ",
                    )}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default NamePlaylistSection;
