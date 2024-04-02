import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

import Link from "next/link";
import { type NextPage } from "next";

import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "~/components/Layout";
import CardSkeletonVideo from "~/components/CardSkeletonVideo";
import ErrorPage from "~/components/Error";
import {
  CommentSection,
  SmSingleColumnSidebarVideo,
  UserImage,
  UserName,
} from "~/components/Components";
import VideoPlayer from "~/components/VideoPlayer";
import CardSkeletonSideBar from "~/components/CardSkeletonSidebar";
import { cn, timeFormat } from "lib/untils";
import { Share } from "~/components/Icons/Icons";
import SliderTabs from "~/components/SliderTabs";
import Collapsible from "~/components/Collapse";
import FollowButton from "~/components/Buttons/FollowButton";
import LikeDislikeButton from "~/components/Buttons/LikeDislikeButton";
import useIsMobile from "~/utils/useIsMobile";
import SaveButton from "~/components/Buttons/SaveButton";

const VideoPage: NextPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const { videoId } = router.query;
  const { data: sessionData } = useSession();
  const viewerId = sessionData?.user.id;
  const isMobile = useIsMobile();
  const {
    data: videoData,
    isLoading: videoLoading,
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
  // console.log(videoData);
  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const {
    data: sidebarVideos,
    isLoading: sidebarLoading,
    error: sidebarError,
    refetch: refetchSidebarVideos,
  } = api.video.getRandomVideos.useQuery(20, {
    enabled: false, // this query will not run automatically
  });
  // console.log(sidebarVideos?.videos.length);

  // const addViewMutation = api.videoEngagement.addViewCount.useMutation();

  // const addView = (input: { id: string; userId: string }) => {
  //   addViewMutation.mutate(input);
  // };

  // useEffect(() => {
  //   if (videoId) {
  //     void refetchVideoData();
  //     addView({
  //       id: videoId as string,
  //       userId: sessionData ? sessionData.user.id : " ",
  //     });
  //   }
  // }, [videoId]);

  const addViewMutation = api.videoEngagement.addViewCount.useMutation();
  const addView = (input: { id: string; userId: string }) => {
    addViewMutation.mutate(input);
  };

  useEffect(() => {
    if (videoId) {
      void refetchVideoData();
      addView({
        id: videoId as string,
        userId: sessionData ? sessionData.user.id : "",
      });
    }
  }, [videoId]);

  useEffect(() => {
    if (!sidebarVideos) {
      void refetchSidebarVideos(); // manually refetch sidebarVideos if they do not exist
    }
  }, []);

  if (!videoData || !("video" in videoData)) {
    // Nếu videoData không tồn tại hoặc không có trường 'video'
    return <p>Loading...</p>; // hoặc hiển thị thông báo lỗi
  }

  // const [isSubscribe, setIsSubscribe] = useState(false);
  const video = videoData?.video;

  const user = videoData?.user;
  const viewer = videoData?.viewer;
  // const errorTypes = !videoData || !user || !video || !viewer;
  const errorTypes = !videoData || !user || !video;

  // console.log(videoData);
  // console.log(user);
  const DataError = () => {
    if (videoLoading) {
      return (
        <div className="w-full sm:px-4 lg:w-4/5 ">
          <CardSkeletonVideo cards={1} />
        </div>
      );
    }
    if (errorTypes) {
      return (
        <ErrorPage
          title="No video"
          desc="Sorry there is an error with video ."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>{video?.title}</title>
        <meta name="description" content={user?.description ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={true}>
        <main className="mx-auto xs:p-4 lg:flex">
          {errorTypes ? (
            <DataError />
          ) : (
            <>
              <div className="lg:3/5 w-full sm:px-4 xl:w-4/5 ">
                <div className="fixed left-0 right-0 top-8 z-20  py-4 xs:relative xs:top-[0px]">
                  <VideoPlayer
                    url={video?.videoUrl ?? ""}
                    width={"100%"}
                    height={"50%"}
                  />
                </div>
                <div className="mt-60 flex space-x-3 rounded-2xl  px-2 py-4 shadow-sm xs:mt-0 xs:px-0 xs:py-0">
                  <div className="min-w-0 flex-1 space-y-3 ">
                    <div className="flex flex-col justify-between max-md:flex-wrap  xs:flex-wrap">
                      <div className=" ">
                        <p className="text-lg font-semibold">{video?.title}</p>
                      </div>

                      <div className="flex flex-col justify-between md:flex-row md:items-center">
                        <div className="flex items-center ">
                          <Link href={`/${video?.userId}/ProfileVideos`}>
                            <div className={cn(isMobile ? "pr-2" : "pr-4")}>
                              <UserImage
                                image={user?.image ?? ""}
                                className="h-9 w-9"
                              />
                            </div>
                          </Link>
                          <div
                            className={cn(
                              isMobile ? " flex-row" : "flex-col",
                              "flex ",
                            )}
                          >
                            <Link href={`/${video?.userId}/ProfileVideos`}>
                              <UserName
                                name={user?.name ?? ""}
                                className="text-sm"
                              />
                            </Link>
                            <p
                              className={cn(
                                isMobile
                                  ? "ml-2 text-sm text-gray-400 "
                                  : "text-sm text-gray-600 ",
                                "  flex items-center gap-x-1",
                              )}
                            >
                              <span
                                className={cn(!isMobile ? "text-sm" : "mr-1")}
                              >
                                {user?.followers}
                              </span>
                              <p className={cn(isMobile && "hidden")}>
                                subscribers
                              </p>
                            </p>
                          </div>
                          <FollowButton
                            followingId={user?.id}
                            viewer={viewer}
                            viewerId={viewerId}
                          />
                        </div>

                        <div className="flex-inline flex items-center justify-start  gap-4   ">
                          {/* <LikeDislikeButton
                            EngagementData={{
                              id: video.id,
                              likes: video.likes,
                              dislikes: video.disLikes,
                            }}
                            viewer={{
                              hasDisliked: viewer.hasDisliked,
                              hasLiked: viewer.hasLiked,
                            }}
                          /> */}
                          <LikeDislikeButton
                            EngagementData={{
                              id: video.id,
                              likes: video.likes,
                              dislikes: video.disLikes,
                            }}
                            viewer={{
                              hasDisliked: viewer.hasDisliked,
                              hasLiked: viewer.hasLiked,
                            }}
                          />
                          {/* <SaveButton videoId={video.id} /> */}
                          <button className="flex gap-x-2 rounded-full bg-gray-100 px-4 py-2 hover:bg-gray-200">
                            <Share className="h-6 w-6" />
                            Share
                          </button>
                          <SaveButton videoId={videoId as string} />
                          <button className="rounded-full bg-gray-100 px-4 py-2">
                            More
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl bg-gray-100 p-2 ">
                      <div className="flex gap-x-4">
                        <p className="font-semibold">
                          {video?.views} {video?.views > 1 ? "views" : "view"}
                        </p>
                        <p className="font-semibold">
                          {" "}
                          {timeFormat(video.createdAt)}
                        </p>

                        {/* tag */}
                        <p className="font-semibold text-blue-600">
                          #abc #video #trending
                        </p>
                      </div>
                      <div className="w-full">
                        <Collapsible
                          description={video?.description ?? ""}
                          userId={video?.userId ?? ""}
                          userName={user?.name ?? ""}
                          userImageUrl={user?.image ?? ""}
                          followers={user?.followers ?? ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Section */}
                {videoLoading && <p>Loading...</p>}
                {!videoLoading && (
                  <>
                    {videoData?.comments && (
                      <CommentSection
                        userVideoId={videoData.user.id}
                        userVideoImageUrl={videoData.user.image ?? ""}
                        videoId={video.id}
                        comments={videoData?.comments?.map(
                          ({ user, comment }) => ({
                            comment: {
                              id: comment.id,
                              message: comment.message,
                              createdAt: comment.createdAt,
                            },
                            user: {
                              id: user?.id,
                              name: user?.name,
                              email: user?.email,
                              image: user?.image,
                              handle: user?.handle,
                            },
                          }),
                        )}
                        refetch={refetchVideoData}
                      />
                    )}
                  </>
                )}
                {/* <CommentSection
                  videoId={video.id}
                  comments={videoData.comments.map(({ user, comment }) => ({
                    comment: {
                      id: comment.id,
                      message: comment.message,
                      createdAt: comment.createdAt,
                    },
                    user: {
                      id: user.id,
                      name: user.name,
                      image: user.image,
                      handle: user.handle,
                    },
                  }))}
                  refetch={refetchVideoData}
                /> */}
              </div>
            </>
          )}
          <div className=" mb-14 xs:mb-0  xs:mr-10 lg:w-[25%] lg:px-0">
            {!sidebarVideos ? (
              <CardSkeletonSideBar cards={20} />
            ) : (
              // <></>
              <>
                <div
                  className={cn(
                    isMobile && scrollY < 120
                      ? "hidden"
                      : "fixed left-0 right-0 top-[289px] z-10 xs:relative xs:top-1 xs:z-0",
                  )}
                >
                  <SliderTabs isFixed={false} />
                </div>
                <SmSingleColumnSidebarVideo
                  refetch={refetchSidebarVideos}
                  videos={sidebarVideos?.videos.map((video) => ({
                    id: video?.id ?? "",
                    title: video?.title ?? "",
                    thumbnailUrl: video?.thumbnailUrl ?? "",
                    createdAt: video?.createdAt ?? new Date(),
                    views: video?.views ?? 0,
                  }))}
                  users={sidebarVideos?.users.map((user) => ({
                    name: user?.name ?? "",
                    image: user?.image ?? "",
                  }))}
                />
              </>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default VideoPage;
