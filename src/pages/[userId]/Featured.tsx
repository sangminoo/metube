import { type NextPage } from "next";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ProfileHeader from "~/components/ProfileHeader";
import ErrorPage from "~/components/Error";
import { MuliColumnVideo } from "~/components/Components";
const Featured: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();

  const { data, isLoading, error } = api.video.getVideosByUserId.useQuery(
    userId as string,
  );

  const errorTypes = !data || data.videos.length === 0 || error;
  const Error = () => {
    if (isLoading) {
      return <></>;
    } else if (userId == sessionData?.user.id && errorTypes) {
      return (
        <>
          <ErrorPage
            title="Create content on any device"
            desc="Upload and record at home or on the go. All of your public content will appear here."
          >
            <button
              className="btn btn-neutral btn-sm mt-4 w-fit rounded-full"
              onClick={() => {
                window.location.href = "/upload";
              }}
            >
              Create
            </button>
          </ErrorPage>
        </>
      );
    } else if (errorTypes) {
      return (
        <ErrorPage
          title="Create content on any device"
          desc="Upload and record at home or on the go. All of your public content will appear here."
        />
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <Layout>
        <div className="py-3">
          <ProfileHeader />

          {errorTypes ? (
            <div className="flex flex-col justify-center">
              <Error />
            </div>
          ) : (
            <div className=" grid  h-full grid-cols-2 gap-y-8 overflow-hidden sm:grid-cols-3  md:gap-y-8 lg:grid-cols-4    xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-6">
              <MuliColumnVideo
                videos={data?.videos.map((video) => ({
                  id: video?.id,
                  title: video?.title ?? "",
                  thumbnailUrl: video?.thumbnailUrl ?? "",
                  createdAt: video?.createdAt ?? new Date(),
                  views: video?.views ?? 0,
                }))}
                users={data?.users.map((user) => ({
                  name: user?.name ?? "",
                  image: user?.image ?? "",
                }))}
                isNotUserImage
              />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Featured;
