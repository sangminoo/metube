import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import CardSkeletonVideo from "~/components/CardSkeletonVideo";
import ErrorPage from "~/components/Error";
import Layout from "~/components/Layout";
import SliderTabs from "~/components/SliderTabs";
import { api } from "~/utils/api";
import VideoPlayer from "~/components/VideoPlayer";
import { SmSingleColumnSidebarVideo } from "~/components/VideoComponent";
import { useEffect, useState } from "react";
import useIsMobile from "~/utils/useIsMobile";
import { cn } from "lib/untils";

const VideoIdPage: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { data: sessionData } = useSession();
  const viewerId = sessionData?.user.id;
  const isMobile = useIsMobile();

  const {
    data: videoData,
    isLoading: VideoLoading,
    error: videoError,
    refetch: refetchVideoData,
  } = api.video.getVideoById.useQuery(
    {
      id: videoId as string,
      viewerId: viewerId,
    },
    {
      enabled: !!videoId && !!viewerId, // run the query when videoId and viewerId
    },
  );

  const {
    data: sidebarVideos,
    isLoading: sidebarLoading,
    error: sidebarError,
    refetch: refetchSidebarVideos,
  } = api.video.getRandomVideos.useQuery(20, {
    enabled: false, // this query will not run automatically
  });

  useEffect(() => {
    if (!sidebarVideos) void refetchSidebarVideos;
  }, []);

  console.log(sidebarVideos?.videos);

  // const [scrollY, setScrollY] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };
  //   // just trigger this so that the initial state
  //   // is updated as soon as the component is mounted
  //   // related: https://stackoverflow.com/a/63408216
  //   handleScroll();
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const video = videoData?.video;
  const user = videoData?.user;
  // const comments = videoData?.comments;
  // const viewer = videoData?.viewer;

  const errorTypes = !videoData || !user || !video;

  if (errorTypes) {
    return (
      <ErrorPage
        title="Not found video"
        desc="Sorry, it seems there is an error when loading video"
      />
    );
  }

  // const DataError = () => {
  //   if (VideoLoading) {
  //     return <CardSkeletonVideo cards={1} />;
  //   } else if (typeErrors) {
  //     return (
  //       <ErrorPage
  //         title="Not found video"
  //         desc="Sorry, it seems there is an error when loading video"
  //       />
  //     );
  //   }
  // };

  console.log(video);
  //    // console.log(videoId);
  // console.log(video);

  return (
    <>
      <Head>
        {/* <title className="text-lg">{video?.title ?? ""}</title> */}
        <title className="text-lg">{"Hello"}</title>

        {/* <meta name="description" content={user?.description ?? ""} /> */}
        <meta name="description" content={"Hello"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={true}>
        <main className=" mx-2 mt-8 h-full w-full ">
          {/* Video */}
          <div className=" grid grid-cols-12 flex-col gap-x-6 gap-y-40">
            <div className="col-span-12 h-full lg:col-span-7">
              {VideoLoading && <CardSkeletonVideo cards={1} />}
              <div className="flex flex-col gap-y-2">
                {video?.videoUrl && (
                  <div
                    className={cn(
                      isMobile && "fixed z-20",
                      "right-0 top-0 mx-0 flex sm:flex  ",
                    )}
                  > 
                    <VideoPlayer
                      url={video?.videoUrl ?? ""}
                      width={"100%"}
                      height={"50%"}
                    />
                  </div>
                )}

                <div className={cn(isMobile ? "mt-44" : "")}>
                  <p className="text-lg font-semibold">{video?.title ?? ""}</p>
                </div>
              </div>
              {/* Video */}
            </div>

            {/* List */}
            <div className=" col-span-12 h-full w-full  overflow-hidden lg:col-span-5 ">
              <div className="mb-8 flex h-full w-full flex-col">
                <div className={cn(isMobile && scrollY < 120 ? "hidden" : "")}>
                {/* <div className={cn(isMobile  ? "hidden" : "")}> */}
                  <SliderTabs
                    isFixed={isMobile ? true : false}
                    className={cn(isMobile ? "top-60 mx-0 " : "")}
                  />
                </div>

                <div className={cn("mt-0 h-full w-full bg-red-50")}>
                  <div>
                    {!sidebarVideos ? (
                      <ErrorPage
                        title="Not found video"
                        desc="Sorry, it seems there is an error when loading video"
                      />
                    ) : (
                      <SmSingleColumnSidebarVideo
                        users={(sidebarVideos?.users ?? []).map((user) => ({
                          image: user?.image ?? "",
                          name: user?.name ?? "",
                        }))}
                        videos={(sidebarVideos?.videos ?? []).map((video) => ({
                          id: video?.id ?? "",
                          title: video?.title ?? "",
                          description: video?.description ?? "",
                          thumbnailUrl: video?.thumbnailUrl ?? "",
                          createdAt: video?.createdAt ?? new Date(),
                          views: video?.views ?? 0,
                        }))}
                        // isLoading={isLoading}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default VideoIdPage;
<></>;
