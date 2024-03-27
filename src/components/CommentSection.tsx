import { cn, timeFormat } from "lib/untils";
import { UserImage, UserName } from "./Components";
import Like from "./Icons/Like";
import Unlike from "./Icons/Unlike";
import UserHeart from "./UserHeart";
import { signIn, useSession } from "next-auth/react";
import { type ChangeEvent, useRef, useState } from "react";
import FaceSmile from "./Icons/FaceSmile";
import useAutoSizeTextArea from "~/utils/useAutoSizeTextArea";
import { api } from "~/utils/api";
import DotsVertical from "./Icons/DotsVertical";
import Edit from "./Icons/Edit";
import Trash from "./Icons/Trash";

interface Comment {
  comment: {
    id: string;
    message: string;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    handle: string | null;
  };
}

interface CommentSectionProps {
  userVideoId?: string;
  userVideoImageUrl?: string;
  videoId: string;
  comments: Comment[];
  refetch: () => Promise<unknown>;
}

const CommentSection = ({
  userVideoId,
  userVideoImageUrl,
  comments,
  videoId,
  refetch,
}: CommentSectionProps) => {
  // this value is comment from user
  const [value, setValue] = useState<string>("");
  const [isComment, setIsComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(comments);

  // Thêm state để theo dõi trạng thái loading của việc xóa comment
  const [deleteCommentLoading, setDeleteCommentLoading] = useState<
    string | null
  >(null);
  const [commentLoading, setCommentLoading] = useState<Array<boolean>>(
    Array(comments.length).fill(false),
  );
  // console.log(commentLoading);

  const addCommentMutation = api.comment.addComment.useMutation();
  const deleteCommentMutation = api.comment.deleteComment.useMutation();
  const { data: sessionData } = useSession();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoSizeTextArea("title-input", textAreaRef.current, value);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  if (!videoId) {
    return <div>Loading...</div>;
  }

  const addComment = (input: {
    videoId: string;
    userId: string;
    message: string;
  }) => {
    // console.log(input);
    // setIsLoading(true);
    const newCommentLoading = [...commentLoading];

    // console.log(...commentLoading);
    // console.log(newCommentLoading);

    newCommentLoading.unshift(true); // Set loading for the new comment
    // console.log(newCommentLoading);

    setCommentLoading(newCommentLoading);
    // console.log(newCommentLoading);

    setIsComment(false);
    setValue("");
    addCommentMutation.mutate(input, {
      onSuccess: () => {
        void refetch();
        setCommentLoading(Array(comments.length).fill(false)); // Reset loading for all comments
        // setIsLoading(false);
      },
      onError: () => {
        // Handle error if needed
        setCommentLoading(Array(comments.length).fill(false)); // Reset loading for all comments
        // setIsLoading(false);
      },
    });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addComment({
      videoId,
      userId: sessionData ? sessionData?.user.id : ("none" as string),
      message: value,
    });
  };

  const deleteComment = (input: {
    videoId: string;
    userId: string;
    commentId: string;
  }) => {
    const cmtId = input.commentId;
    console.log(cmtId);

    setDeleteCommentLoading(cmtId);
    deleteCommentMutation.mutate(input, {
      onSuccess: () => {
        void refetch();
        setDeleteCommentLoading(null);
      },
    });
  };

  const handleDelete = (videoId: string, userId: string, commentId: string) => {
    deleteComment({ videoId, userId, commentId });
  };

  return (
    <>
      <div className="flex items-center gap-x-8 py-5">
        <h2 className="flex text-xl font-bold">
          {comments.length}
          {comments.length > 1 ? (
            <p className="ml-1">comments</p>
          ) : (
            <p className="ml-1">comment</p>
          )}
        </h2>

        <div className="flex items-center gap-x-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="button flex gap-x-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              <p className="text-base">Sort by</p>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a>Top comments</a>
              </li>
              <li>
                <a>Newest first</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex w-full py-5 ">
          <div className="pb-1 pr-4">
            <UserImage
              image={sessionData?.user?.image ?? ""}
              className="h-10 w-10"
              userName={
                sessionData?.user?.name ?? sessionData?.user?.email ?? ""
              }
            />
          </div>
          <form
            onSubmit={handleOnSubmit}
            className="mr-4  flex flex-1 flex-col"
          >
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
              <textarea
                value={value}
                ref={textAreaRef}
                id="title-input"
                placeholder="Add a comment..."
                onChange={handleOnChange}
                className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50  peer w-full resize-none  overflow-y-hidden border-b bg-transparent pb-2  font-sans text-sm font-normal outline outline-0  focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0"
                // className=" border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer  w-full resize-none  border-b bg-transparent pb-1.5 pt-0 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0"
              />
              <label className="after:content[' '] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none  absolute -top-4 left-0 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent"></label>
            </button>
            {isComment && (
              <div className=" flex items-center justify-between">
                <div className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
                  <FaceSmile className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    className="rounded-3xl px-3 py-[6px] hover:bg-gray-300"
                    type="button"
                    onClick={() => {
                      setIsComment(false);
                      setValue("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                    disabled={!value || !value.trim()}
                    className={cn(
                      "rounded-3xl bg-blue-600 px-3  py-[6px] text-white disabled:bg-gray-200 disabled:text-gray-500 ",
                    )}
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* {comments.map((cmt) => (
          <p className="" key={cmt.id}>
            {cmt.comment.message}
          </p>
        ))} */}
        {/* className=" border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full min-h-[40px] w-full resize-none  border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0" */}

        {comments
          .sort(
            (a, b) =>
              new Date(b.comment.createdAt).getTime() -
              new Date(a.comment.createdAt).getTime(),
          )
          .map(({ user, comment }, index) => (
            <div className="" key={comment.id}>
              {deleteCommentLoading === comment.id && (
                <div className="mx-auto flex h-full w-full items-center justify-center py-2">
                  <span className="loading-spinner-small loading"></span>
                </div>
              )}
              {commentLoading[index] && (
                <div className="mx-auto flex h-full w-full items-center justify-center py-2">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              )}
              <div className="flex gap-x-4 py-2 ">
                <UserImage
                  className="h-10 w-10"
                  image={user.image ?? ""}
                  userName={
                    sessionData?.user?.name ?? sessionData?.user?.email ?? ""
                  }
                />

                <div className="flex w-full flex-col">
                  <div className="flex">
                    <div
                      className={cn(
                        userVideoId === user.id
                          ? "w-fit rounded-full bg-[#888888] px-2 py-[2px] text-white "
                          : "text-black",
                      )}
                    >
                      <UserName
                        className={cn(
                          userVideoId === user.id
                            ? "text-white "
                            : "text-black",
                          "text-xs font-semibold",
                        )}
                        name={user.handle ?? user?.email ?? ""}
                      />
                    </div>
                    <span className="ml-2  text-xs font-medium text-gray-600">
                      {timeFormat(comment.createdAt)}
                    </span>
                  </div>
                  <p> {comment.message}</p>

                  <div className="flex items-center gap-x-4 ">
                    <span className="flex items-center gap-x-2">
                      <Like className="h-5 w-5" /> 1
                    </span>
                    <span className="flex items-center gap-x-2">
                      <Unlike className="h-5 w-5" />
                    </span>
                    <UserHeart userImageUrl={userVideoImageUrl ?? ""} />
                    <p className="ml-4 text-sm font-semibold">Reply</p>
                  </div>
                </div>
                {/* button more */}
                <div className="w-10">
                  <button className="flex justify-center rounded-full py-1 focus:bg-gray-200">
                    <div className="dropdown dropdown-bottom ">
                      <div tabIndex={0} role="button" className="btn m-1">
                        <DotsVertical className="h-4 w-4 " />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] w-fit rounded-box bg-base-100 px-0  shadow"
                      >
                        {user.id === sessionData?.user.id ? (
                          <>
                            <li>
                              <button className="px-2">
                                <span>
                                  {" "}
                                  <Edit className="h-5 w-5" />
                                </span>
                                <p className="px-2">Edit</p>
                              </button>
                            </li>
                            <li>
                              <button
                                className="px-2"
                                disabled={deleteCommentLoading === comment.id}
                                onClick={() =>
                                  handleDelete(
                                    videoId,
                                    sessionData?.user.id ?? "",
                                    comment.id,
                                  )
                                }
                              >
                                <span>
                                  {" "}
                                  <Trash className="h-5 w-5" />
                                </span>
                                <p className="px-2">Delete</p>
                              </button>
                            </li>
                          </>
                        ) : (
                          <li>Report</li>
                        )}
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentSection;
