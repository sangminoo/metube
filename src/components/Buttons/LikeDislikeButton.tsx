import { cn } from "lib/untils";
import { signIn, useSession } from "next-auth/react";
import { useEngagementButton } from "~/hooks/useEngagement";
import { api } from "~/utils/api";
import { Like, Liked, Unlike, Unliked } from "../Icons/Icons";

interface LikeDislikeButtonProps {
  EngagementData: {
    id: string;
    likes: number;
    dislikes: number;
  };

  viewer: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
}

const LikeDislikeButton = ({
  EngagementData,
  viewer,
}: LikeDislikeButtonProps) => {
  console.log(EngagementData);
  console.log(viewer);

  const { data: sessionData } = useSession();

  const { likeCount, dislikeCount, userChoice, handleDislike, handleLike } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.videoEngagement.addLike.useMutation(),
      addDislikeMutation: api.videoEngagement.addDisliked.useMutation(),
    });

  console.log(userChoice);
  console.log(EngagementData);
  console.log(viewer);
  console.log(likeCount);
  

  return (
    <>
      <div className="flex items-center   rounded-full bg-gray-100 ">
        <button
          onClick={
            sessionData
              ? () =>
                  handleLike({
                    id: EngagementData.id,
                    userId: sessionData?.user.id,
                  })
              : () => signIn("")
          }
          className=" rounded-bl-full rounded-tl-full px-3  py-2  hover:bg-gray-200  "
        >
          <span className=" mx-1 flex h-full gap-x-3 pr-1 ">
            {userChoice.like ? (
              <Liked className="h-6 w-6" />
            ) : (
              <Like className="h-6 w-6" />
            )}
            <p className="font-semibold"> {likeCount}</p>
          </span>
        </button>
        <span className="   bg-gray-300 px-[.5px] py-[13px]" />
        <button
          onClick={
            sessionData
              ? () =>
                  handleDislike({
                    id: EngagementData.id,
                    userId: sessionData?.user.id,
                  })
              : () => signIn("")
          }
          className="rounded-br-full rounded-tr-full  p-2  hover:bg-gray-200  "
        >
          <span className="mx-1 flex gap-x-3">
            {userChoice.dislike ? (
              <Unliked className="h-6 w-6" />
            ) : (
              <Unlike className="h-6 w-6" />
            )}
          </span>
          {/* <p className="font-semibold">{dislikeCount}</p> */}
        </button>
      </div>
    </>
  );
};

export default LikeDislikeButton;
