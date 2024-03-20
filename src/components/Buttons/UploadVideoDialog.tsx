import { Dialog, Transition } from "@headlessui/react";
import { cn, extractTitle } from "lib/untils";
import { Fragment, useState } from "react";
import UpVideo from "../Icons/UpVideo";
import HelpCircle from "../Icons/HelpCircle";
import Close from "../Icons/Close";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { env } from "~/env";

interface UploadVideoDialogProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  closeUpload?: boolean;
  refetch: () => Promise<unknown>;
}
const UploadVideoDialog = ({
  setIsOpen,
  isOpen,
  refetch,
}: UploadVideoDialogProps) => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { data: sessionData } = useSession();
  const cloudinaryName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

  const addVideoUpdateMutation = api.video.createVideo.useMutation();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedVideo(e.target.files[0] ? e.target.files[0] : null);
      setTitle(e.target.files[0]?.name);

      type UploadResponse = {
        secure_url: string;
      };

      const videoData = {
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        userId: sessionData?.user.id as string,
        videoUrl: "",
        title: (title && extractTitle(title)) ?? "",
      };

      const formData = new FormData();
      formData.append("upload_preset", "user_uploads");
      if (uploadedVideo) {
        formData.append("file", uploadedVideo);
        fetch(
          "https://api.cloudinary.com/v1_1/" + cloudinaryName + "/video/upload",
          {
            method: "POST",
            body: formData,
          },
        )
          .then((response) => response.json() as Promise<UploadResponse>)
          .then((data) => {
            if (data.secure_url !== undefined) {
              const newVideoData = {
                ...videoData,
                ...(data.secure_url && { videoUrl: data.secure_url }),
              };

              addVideoUpdateMutation.mutate(newVideoData, {
                onSuccess: ({ id }) => {
                  setIsOpen(false);
                  setVideoId(id);
                  void refetch();
                },
              });
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      }
    }
  };
  // console.log(title);
  // console.log(videoId);

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          // className="relative z-50 h-full xl:hidden"
          className={cn(
            // isSidebarBaseVisible ? "" : "xl:hidden",
            "relative z-50 h-full ",
          )}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto bg-[#707070]/50 p-4 lg:bg-none " />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className=" h-full   w-full  max-w-[960px]  transform rounded-md bg-white pb-10  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <div className=" flex justify-between border-b border-gray-200 p-4">
                      <h2 className="text-2xl font-semibold">Upload video</h2>
                      <div className="flex gap-x-2">
                        <span className="cursor-pointer p-1">
                          <HelpCircle className="" />
                        </span>
                        <button
                          className="p-1 "
                          onClick={() => setIsOpen(false)}
                        >
                          <Close className="h-6 w-6 hover:opacity-80" />
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>
                  <Dialog.Description
                    className={
                      "flex h-full w-full flex-col items-center justify-center py-10"
                    }
                  >
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-y-6">
                      {/*  */}
                      <label className="flex h-36 w-36 cursor-pointer items-center  justify-center rounded-full bg-gray-200 p-3">
                        <UpVideo className="h-14 w-14 " />
                        <input
                          type="file"
                          onChange={onFileChange}
                          className="hidden"
                          // onChange={handleChange}
                        />
                      </label>
                      <div className="text-center">
                        <p> Drag and drop video files to upload</p>

                        <p className="text-sm text-gray-500">
                          Your videos will be private until you publish themp.
                        </p>
                      </div>

                      <label className="btn btn-primary btn-sm">
                        <input
                          type="file"
                          onChange={onFileChange}
                          className="hidden"
                        />
                        Choose file
                      </label>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UploadVideoDialog;
