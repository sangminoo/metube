import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import ErrorPage from "~/components/Error";
import Layout from "~/components/Layout";
import { PlaylistPage } from "~/components/PlaylistComponents";
import { api } from "~/utils/api";

const History: NextPage = () => {
  const { data: sessionData } = useSession();
  const queryTitle = "History" as string;
  const { data, isLoading, error } = api.playlist.getPlaylistsByTitle.useQuery({
    title: queryTitle,
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    userId: sessionData?.user.id as string,
  });

  console.log(data?.videos);

  const Error = () => {
    if (isLoading) {
      return <>Loading...</>;
    } else if (error ?? !data) {
      return (
        <ErrorPage
          title="No Current History"
          desc="Watching some videos inorder to add to history."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Layout>
        <>
          {!data ? (
            <Error />
          ) : (
            <PlaylistPage
              authors={data?.authors?.map((author) => ({
                id: author?.id ?? "",
                name: author?.name ?? "",
                image: author?.image ?? "",
              }))}
              videos={data?.videos.map((video) => ({
                id: video?.id ?? "",
                title: video?.title ?? "",
                thumbnailUrl: video?.thumbnailUrl ?? "",
                createdAt: video?.createdAt ?? new Date(),
                views: video?.views ?? 0,
              }))}
              playlist={{
                id: data.playlist?.id ?? "",
                title: data.playlist?.title ?? "",
                description: data.playlist?.description ?? "",
                videoCount: data.videos.length ?? 0,
                playlistThumbnail: data.videos[0]?.thumbnailUrl ?? "",
                createdAt: data.playlist?.createdAt ?? new Date(),
              }}
              user={{
                id: data?.user?.id ?? "",
                image: data?.user?.image ?? "",
                name: data?.user?.name ?? "",
                followers: data?.user?.followers ?? 0,
              }}
            />
          )}
        </>
      </Layout>
    </>
  );
};

export default History;
