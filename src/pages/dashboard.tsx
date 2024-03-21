import { Dialog, Transition } from "@headlessui/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Table from "~/components/Table";
import UploadVideo from "~/components/Icons/UploadVideo";
import Layout from "~/components/Layout";
import UploadVideoDialog from "~/components/Buttons/UploadVideoDialog";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading, error, refetch } =
    api.user.getDashboardData.useQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      sessionData?.user.id!,
    );
  const [isOpen, setIsOpen] = useState(false);

  const videos = data?.videos;
  console.log(videos);
  // console.log(data?.totalViews);

  return (
    <>
      <Head>
        <title className="text-lg">Youtube Creator Studio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isDashboard closeSidebar={true}>
        <>
          <div className="bg-gray-50 p-8">
            <div className="flex items-center justify-between">
              <h1 className="pb-6 text-2xl font-bold">Channel dashboard</h1>
              <div>
                <button
                  className="btn btn-ghost btn-sm rounded-full bg-white"
                  onClick={() => setIsOpen(true)}
                >
                  UploadVideo
                </button>
                <button className="btn btn-ghost btn-sm rounded-full bg-white">
                  Live
                </button>
              </div>
            </div>

            <div className="flex gap-x-6 ">
              <div className=" h-[510px]  w-[390px] rounded-md border border-gray-200 bg-white p-3  ">
                <div className=" flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-dotted  text-center text-gray-500 ">
                  <UploadVideo className="h-40 w-40" />

                  <p>Do you want to see metrics for recent video?</p>
                  <p>Upload and publish a video to get started.</p>

                  <button
                    className="btn btn-primary btn-sm mt-8"
                    onClick={() => setIsOpen(true)}
                  >
                    Upload video
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-y-6 ">
                <div className="h-fit w-[390px] rounded-sm  border border-gray-200 bg-white pb-4">
                  <h2 className="px-6 pt-4 text-xl font-bold ">
                    Channel analytics
                  </h2>
                  <div className="px-6 ">
                    <p className="pt-2">Number of recent subscribers</p>
                    <p className="text-4xl font-bold">{data?.totalFollowers}</p>
                    <p className="border-b border-gray-200 pb-4">
                      <span className="text-green-700">Increased by 1</span> in
                      the last 28 days
                    </p>
                  </div>

                  <div className="px-6 py-1 ">
                    <p className="pt-2 font-bold">Summary</p>
                    <p className="text-xs text-gray-500">Last 28 days</p>
                  </div>

                  <div className="px-6 ">
                    <p className=" flex items-center justify-between leading-8">
                      Views
                      <span>{data?.totalViews} -</span>
                    </p>
                    <p className="flex items-center justify-between border-b border-gray-200 pb-4 leading-8 ">
                      Viewing time
                      <span>{data && data?.totalViews / 100} -</span>
                    </p>
                  </div>

                  <div className="px-6 py-1 ">
                    <p className="pt-2 font-bold">Top videos</p>
                    <p className="text-xs text-gray-500">
                      Last 48 hours · Views
                    </p>

                    <div className="py-4">
                      <p className=" flex items-center justify-between text-sm leading-6">
                        A day of Ricardo Milos<span> 3</span>
                      </p>

                      {data?.videos.map((vid) => (
                        <div key={vid.id}>
                          <p className=" flex items-center justify-between text-sm leading-6">
                            {vid.title}
                            <span>1</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={"#"}
                      className="py-4 font-sans text-lg uppercase  text-primary "
                    >
                      Go to analytics
                    </Link>
                  </div>
                </div>

                <div className="h-fit w-[390px] rounded-sm  border border-gray-200 bg-white px-6 pb-4">
                  <div className="flex flex-col">
                    <div className=" ">
                      <p className="pt-2 font-bold">Latest comments</p>
                      <p className="text-xs text-gray-500">
                        Comments I have not responded to on the channel
                      </p>
                    </div>
                    <div className="flex flex-col  justify-between py-2 ">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="avatar placeholder flex items-center gap-x-1 text-sm text-gray-500">
                            <div className="mr-2 w-6 rounded-full bg-green-600 text-neutral-content">
                              <span className="text-xs">S</span>
                            </div>
                            <p>Sang Mino</p>
                            <p>• 3 days ago</p>
                          </div>
                          <p className="mx-2 w-full pl-7">Good job</p>
                        </div>

                        <div className="relative h-10 w-20 rounded-md">
                          <Image
                            className="absolute inset-0 object-cover"
                            src={
                              "https://upload.wikimedia.org/wikipedia/vi/thumb/5/59/S%C6%A1n_T%C3%B9ng_M-TP_-_Ch%C3%BAng_ta_c%E1%BB%A7a_t%C6%B0%C6%A1ng_lai.png/220px-S%C6%A1n_T%C3%B9ng_M-TP_-_Ch%C3%BAng_ta_c%E1%BB%A7a_t%C6%B0%C6%A1ng_lai.png"
                            }
                            alt=""
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={"#"}
                    className="py-4 font-sans text-lg uppercase  text-primary "
                  >
                    Go to analytics
                  </Link>
                </div>
                <div className="h-fit w-[390px] rounded-sm  border border-gray-200 bg-white px-6 pb-4">
                  <div className="">
                    <p className="pt-2 font-bold">Recent subscribers</p>
                    <p className="text-xs text-gray-500">All the time</p>
                  </div>
                  <div></div>
                </div>
              </div>

              <div>
                <div className="h-fit w-full rounded-sm  border border-gray-200 bg-white pb-4">
                  <h2 className="px-6 pt-4 text-xl font-bold ">
                    Channel content
                  </h2>
                  <Table videos={videos ?? []} refetch={refetch} />
                </div>
              </div>
            </div>

            {/*  */}

            <footer className="mt-10 flex gap-x-10 py-2 text-sm text-gray-500">
              <p>Terms of use</p>
              <p>Privacy policy</p>
              <p>Policy and Safety</p>
            </footer>
          </div>

          {/*  */}
          <UploadVideoDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeUpload={true}
            refetch={refetch}
          />
        </>
      </Layout>
    </>
  );
};

export default Dashboard;
