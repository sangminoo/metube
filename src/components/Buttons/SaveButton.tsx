import { signIn, useSession } from "next-auth/react";
import { Close, SavePlus } from "../Icons/Icons";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import NamePlaylistSection from "../NamePlaylistSection";
const SaveButton = ({ videoId }: { videoId: string }) => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const [checkedStatus, setCheckedStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: playlists, refetch: refetchPlaylists } =
    api.playlist.getSavePlaylistData.useQuery(sessionData?.user.id ?? "", {
      // api.playlist.getSavePlaylistData.useQuery("178" ?? "", {
      enabled: false,
    });

  // console.log(playlists);

  useEffect(() => {
    if (videoId && isOpen) {
      void refetchPlaylists();
      // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
      const initialCheckedStatus: { [key: string]: boolean } = {};
      // console.log(initialCheckedStatus);
      playlists?.forEach((playlist) => {
        initialCheckedStatus[playlist.id] = playlist.videos.some(
          (videoItem) => videoItem.videoId === videoId,
        );
      });
      // console.log(initialCheckedStatus);
      setCheckedStatus(initialCheckedStatus);
      // console.log(initialCheckedStatus);
    }
  }, [isOpen]);
  // console.log(playlists);

  const addVideoToPlayistMutation =
    api.playlist.addVideoToPlaylist.useMutation();

  const handleCheckmarkToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: {
      playlistId: string;
      videoId: string;
    },
  ) => {
    addVideoToPlayistMutation.mutate(input);
    setCheckedStatus({
      ...checkedStatus,
      [input.playlistId]: event.target.checked,
    });
  };
  // console.log(checkedStatus);

  return (
    <>
      <button
        className="flex gap-x-2 rounded-full bg-gray-100 px-4 py-2 hover:bg-gray-200"
        onClick={sessionData ? () => setIsOpen(true) : () => signIn("")}
      >
        <SavePlus className="h-6 w-6" />
        Save
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* ... */}
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div
              className="fixed inset-0 bg-red-100/30 transition-opacity "
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-auto">
            <div className=" flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" relative m-2 flex !max-w-xs transform flex-col items-start justify-start overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-center shadow-xl transition-all sm:my-8 sm:w-full  sm:p-6">
                  <Dialog.Title
                    className={
                      "relative flex w-full items-center justify-between gap-x-4 text-left"
                    }
                  >
                    <p className=" mx-2 w-full">Save videos to...</p>
                    <div className=" right-0 top-0 p-1">
                      <button onClick={() => setIsOpen(false)}>
                        <Close className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Dialog.Title>

                  {/* ... */}
                  <fieldset className="mb-4 w-full">
                    {playlists?.map((playlist) => (
                      <div key={playlist?.id} className="space-y-5 pt-2 ">
                        <div className="relative flex items-start justify-start ">
                          <div className="ml-3 text-sm leading-6 ">
                            <div className="flex h-6 items-center gap-x-6">
                              <input
                                type="checkbox"
                                id="comments"
                                name="comments"
                                checked={checkedStatus[playlist.id] ?? false}
                                className="checkbox-primary checkbox checkbox-sm"
                                onChange={(event) =>
                                  handleCheckmarkToggle(event, {
                                    playlistId: playlist?.id,
                                    videoId,
                                  })
                                }
                              />
                              {playlist?.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* <div className="z-50 ml-3 text-left text-sm leading-6">
                      Watch later
                    </div> */}
                  </fieldset>

                  <NamePlaylistSection
                    videoId={videoId}
                    playlists={playlists ?? []}
                    setIsOpen={setIsOpen}
                    refetchPlaylists={refetchPlaylists} comments={[]}                  />

                  {/* <div >
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        placeholder="Enter name playlist..."
                        className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
                      />
                      <label className="after:content[' '] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none  absolute -top-2.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent">
                        Name
                      </label>
                    </div>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SaveButton;
