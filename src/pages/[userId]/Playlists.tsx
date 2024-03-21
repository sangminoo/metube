import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ButtonArrange from "~/components/Buttons/ButtonArrange";
import ErrorPage from "~/components/Error";
import Layout from "~/components/Layout";
import { MultiColumnPlaylist } from "~/components/PlaylistComponents";
import ProfileHeader from "~/components/ProfileHeader";
import { api } from "~/utils/api";

const Playlists: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();

  const { data, isLoading, error } = api.playlist.getPlaylistsByUserId.useQuery(
    userId as string,
  );
  const errorTypes = !data || data.length === 0 || error;

  const Error = () => {
    if (isLoading) {
      return <></>;
    } else if (errorTypes) {
      return (
        <>
          <ErrorPage title="This channel has no playlists." desc="" />
        </>
      );
    } else {
      return <></>;
    }
  };
  const isUser = userId === sessionData?.user.id;
  return (
    <Layout>
      <div className="py-3 px-5   md:px-10 lg:px-20">
        <ProfileHeader />
        {errorTypes ? (
          <>
            <Error />
          </>
        ) : (
          <div className="">
            <div className="flex justify-between items-center mb-4"> 
                <p className="px-2 py-1 hover:bg-gray-100/50 rounded-md">Created playlists</p>
                <ButtonArrange />
            </div>
            <MultiColumnPlaylist
              playlists={data?.map((playlist) => ({
                id: playlist.id,
                title: playlist.title,
                description: playlist.description ?? "",
                videoCount: playlist.videoCount,
                playlistThumbnail: playlist?.playlistThumbnail ?? "",
                createdAt: playlist.createdAt,
              }))}
              isUser={isUser}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Playlists;
