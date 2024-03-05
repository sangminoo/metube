import { type NextPage } from "next";
import Layout from "~/components/Layout";
import { MuliColumnVideo, ProfileHeader } from "~/components/Components";

const Videos: NextPage = () => {
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

export default Videos;
