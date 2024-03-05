import { type NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { PlaylistPage } from "~/components/PlaylistComponents";
import { api } from "~/utils/api";

const Playlist: NextPage = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const { data, isLoading, error } = api.playlist.getPlaylistById.useQuery(
    playlistId as string,
  );
  const playlist = data?.playlist;

  return (
    <>
      <Layout>
        <div className="md:mt-8">
          <PlaylistPage
            authors={data?.authors?.map((author) => ({
              id: author?.id || "",
              name: author?.name || "",
              image: author?.image || "",
            }))}
            videos={data?.videos.map((video) => ({
              id: video?.id || "",
              title: video?.title || "",
              thumbnailUrl: video?.thumbnailUrl || "",
              createdAt: video?.createdAt || new Date(),
              views: video?.views || 0,
            }))}
            playlist={{
              id: playlist?.id || "",
              title: playlist?.title || "",
              description: playlist?.description || "",
              videoCount: data?.videos.length || 0,
              playlistThumbnail: data?.videos[0]?.thumbnailUrl || "",
              createdAt: playlist?.createdAt ?? new Date(),
            }}
            user={{
              id: data?.user?.id || "",
              image: data?.user?.user?.image || "",
              name: data?.user?.user?.name || "",
              followers: data?.user?.followers || 0,
            }}
          />
        </div>
      </Layout>
    </>
  );
};

export default Playlist;
