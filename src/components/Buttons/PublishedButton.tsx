import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { Global, Lock } from "../Icons/Icons";

interface PublishedButton {
  video: {
    id: string;
    publish?: boolean;
  };
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PublishedButton({ video }: PublishedButton) {
  const { data: sessionData } = useSession();
  const [userChoice, setUserChoice] = useState({
    publish: video.publish,
  });
  const publishVideoMutation = api.video.publishVideo.useMutation();
  const handlePublishVideo = (input: { id: string; userId: string }) => {
    if (userChoice.publish) {
      setUserChoice({ publish: false });
    } else {
      setUserChoice({ publish: true });
    }
    publishVideoMutation.mutate(input);
  };

  return (
    <>
     
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 flex flex-col-reverse items-center gap-y-2">
      <Switch
          checked={userChoice.publish}
          onChange={() =>
            handlePublishVideo({
              id: video.id,
              userId: sessionData ? sessionData.user.id : "",
            })
          }
          className={classNames(
            userChoice.publish ? "bg-primary" : "bg-gray-200",
            "focus:ring-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              userChoice.publish ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            )}
          />
        </Switch>
        {userChoice.publish ? (
          <span className="border-success-700 text-success-700 inline-flex items-center  rounded-full border px-2 py-1 text-xs font-medium">
            <span className="flex items-center justify-center gap-x-2">
              <Global className="h-4 w-4 text-gray-500" />
              Published
            </span>
          </span>
        ) : (
          <span className="border-warning-700 text-warning-700 inline-flex items-center  rounded-full border px-2 py-1 text-xs font-medium">
            <span className="flex items-center justify-center gap-x-2">
              <Lock className="h-4 w-4 text-gray-500" />
              Unpublished
            </span>
          </span>
        )}


      </td>
      <td className="whitespace-nowrap px-3  text-sm text-gray-500">
     
      </td>
    </>
  );
}
