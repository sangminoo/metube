import { type NextPage } from "next";
import Layout from "~/components/Layout";
import {ProfileHeader} from "~/components/Components";

const ProfileVideos: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="py-3">
        <ProfileHeader />

        </div>
      </Layout>
    </>
  );
};

export default ProfileVideos;
