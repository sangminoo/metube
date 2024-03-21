import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSession } from "next-auth/react";
import { env } from "~/env";
import HelpCircle from "./Icons/HelpCircle";
import Copy from "./Icons/Copy";
import Button from "./Buttons/Button";

interface VideoUploaded {
  video: {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    publish?: boolean;
    videoUrl?: string;
  };
}

const VideoUploaded = ({ video }: VideoUploaded) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: sessionData } = useSession();
  const { asPath } = useRouter();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cancelBtnRef = useRef(null);
  const origin =
    // typeof window !== 'undefined' && window.location.origin
    window?.location.origin ? window.location.origin : "";

  const URL = `${origin}${asPath}`;
  const baseURL = `${origin}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const textCopy = `${baseURL}/watch/${video?.id}`;
  async function copyText(entryText: string) {
    console.log(entryText);

    await navigator.clipboard.writeText(entryText);
  }
  const [user, setUser] = useState({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    title: video.title ?? "",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    description: video.description ?? "",
  });

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelBtnRef}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-5xl sm:p-6">
                  {currentPage === 1 && (
                    <>
                      <div className="flex gap-x-6 ">
                        <div className="w-2/3 sm:flex sm:items-start ">
                          <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900 "
                            >
                              Video details
                            </Dialog.Title>
                            <p className="mt-2 text-sm text-gray-500">
                              Edit your thumbnail, title, or description
                            </p>
                            <div className="flex flex-col gap-y-6 pt-4">
                              {/* <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Title
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  value={user.title}
                                  // onChange={handleInputChange}
                                  className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                              </div> */}
                              {/*  */}
                              <div className="relative">
                                <input
                                  type="text"
                                  id="default_filled"
                                  className="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xl text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                                  placeholder=" "
                                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                  value={user.title}
                                  name="title"
                                  //   onChange={handleInputChange}
                                />
                                <label className="absolute start-2.5 top-4 z-10 flex w-full origin-[0] -translate-y-4   scale-75 transform items-center gap-x-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500">
                                  Title (require){" "}
                                  <span>
                                    <HelpCircle className="h-5 w-5 " />
                                  </span>
                                </label>
                              </div>
                              {/*  */}

                              {/* <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  rows={4}
                                  name="description"
                                  id="description"
                                  value={user.description || ""}
                                  // onChange={handleInputChange}
                                  className="focus:ring-primary-600 block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                              </div> */}

                              {/* Desc */}
                              <div className="relative">
                                <textarea
                                  rows={7}
                                  name="description"
                                  id="default_filled"
                                  className="text-md peer block w-full  appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                                  placeholder=" "
                                  value={user.description || ""}
                                  //   onChange={handleInputChange}
                                />
                                <label
                                  className="absolute start-2.5 top-4 z-10 flex origin-[0]  -translate-y-4 scale-75 transform items-center gap-x-2 rounded-md bg-gray-50  text-xl text-gray-500 duration-300 
                                  peer-placeholder-shown:translate-y-0  peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 
                                  peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                  Description{" "}
                                  <span>
                                    <HelpCircle className="h-4 w-4" />
                                  </span>
                                </label>
                              </div>

                              {/*  */}

                              <div className="col-span-full">
                                <label
                                  htmlFor="cover-photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Cover photo
                                </label>
                                <p className="text-sm text-gray-500">
                                  Chọn hoặc tải một hình ảnh lên để thể hiện nội
                                  dung trong video của bạn. Hình thu nhỏ hấp dẫn
                                  sẽ làm nổi bật video của bạn và thu hút người
                                  xem.{" "}
                                  <span className="link link-primary">
                                    Tìm hiểu thêm
                                  </span>
                                </p>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                  <div className="text-center">
                                    {croppedImage ? (
                                      <>
                                        <img src={croppedImage} alt="" />
                                      </>
                                    ) : (
                                      <>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                          <label
                                            htmlFor="file-upload"
                                            className="text-primary-600 focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                                          >
                                            <span>Upload a file</span>
                                            <input
                                              id="file-upload"
                                              name="file-upload"
                                              type="file"
                                              className="sr-only"
                                              //   onChange={onFileChange}
                                            />
                                          </label>
                                          <p className="pl-1">
                                            or drag and drop
                                          </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                          PNG, JPG, GIF up to 10MB
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*  */}
                        <div className="flex h-full  w-1/3 flex-col pt-16  ">
                          <div className="flex flex-col ">
                            <div className="relative  w-full   ">
                              {/* <div className=" h-44 w-full rounded-tl-md  rounded-tr-md bg-gray-200"></div> */}
                              <img
                                src={video?.thumbnailUrl}
                                alt=""
                                className="inset-0  rounded-tl-md  rounded-tr-md object-cover"
                              />
                            </div>
                            <div className="flex justify-between  bg-gray-50 p-4">
                              <div className="flex flex-col">
                                <p className="text-sm text-gray-500">
                                  Link to video:
                                </p>
                                <Link
                                  className="link link-primary"
                                  href={`${baseURL}/watch/${video?.id}`}
                                >
                                  {`${baseURL}/watch/${video?.id}`}
                                </Link>
                              </div>

                              <button onClick={() => copyText(textCopy)}>
                                <Copy className="h-5 w-5" />
                              </button>
                            </div>
                            <div className=" rounded-bl-md rounded-br-md  bg-gray-50  p-4">
                              <div className="flex flex-col">
                                <p className="text-sm text-gray-500">
                                  Name video:
                                </p>
                                <p className="line-clamp-1 font-semibold">
                                  {user?.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" btn-primary relative mt-5 flex flex-row-reverse gap-2 sm:mt-4">
                        <button
                          type="reset"
                          className="btn btn-primary btn-sm"
                          //   onClick={() => handleSubmit()}
                        >
                          Save
                        </button>
                        <Button
                          variant="secondary-gray"
                          size="lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}

                  {currentPage === 2 && (
                    <>
                      {/* <ImageCropper
                        image={image}
                        setCurrentPage={setCurrentPage}
                        setCroppedImage={setCroppedImage}
                      /> */}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default VideoUploaded;
