import { cn } from "lib/untils";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { BellRing, ArrowDown } from "../Icons/Icons";

interface FollowButton {
  followingId: string;
  hiddenIcon?: boolean;
  viewerId?: string;
  viewer: {
    hasFollowed: boolean;
  };
}

const FollowButton = ({
  followingId,
  hiddenIcon,
  viewer,
  viewerId,
}: FollowButton) => {
  console.log(followingId);

  const { data: sessionData } = useSession();
  const [userIsFollow, setUserIsFollow] = useState({
    following: viewer.hasFollowed,
  });

  console.log(userIsFollow);

  const addFollowMutation = api.user.addFollow.useMutation();
  const handleFollow = (input: { followerId: string; followingId: string }) => {
    console.log(input);

    if (userIsFollow.following) {
      setUserIsFollow({ following: false });
    } else {
      setUserIsFollow({ following: true });
    }
    addFollowMutation.mutate(input);
  };

  return (
    <button
      onClick={
        sessionData
          ? () =>
              handleFollow({ followerId: sessionData?.user.id, followingId })
          : () => signIn()
      }
      className={cn(
        userIsFollow.following
          ? "bg-gray-200 text-black hover:bg-gray-200/80"
          : "bg-black  text-white hover:bg-black/80",
        "ml-8 rounded-full  p-1 px-4 ",
      )}
    >
      <div className="flex items-center justify-around gap-x-1 transition-all">
        {userIsFollow.following ? (
          <>
            <span className="hidden p-1 xs:flex">
              <BellRing className="h-5 w-5  " />
            </span>
            <p className="font-semibold">Subscribed</p>
            <span className="hidden p-1 xs:flex">
              <ArrowDown className="h-4 w-4  " />
            </span>
          </>
        ) : (
          <p className="font-medium">Subscribe</p>
        )}
      </div>

      {/* <p className="font-medium">
        {userIsFollow.following ? "Subscribed" : "Subscribe"}
      </p> */}
    </button>
  );
};

export default FollowButton;
