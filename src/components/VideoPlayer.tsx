import ReactPlayer from "react-player";
import useIsMobile from "~/utils/useIsMobile";

const VideoPlayer = ({
  url,
  width,
  height,
}: {
  url: string;
  width: string;
  height: string;
}) => {
  const isMobile = useIsMobile();
  return (
    <ReactPlayer
      controls
      url={url}
      playing
      //   url={"https://youtu.be/661BZRNY9dE"}
      width={width}
      height={height}
      style={{
        borderRadius: `${isMobile ? "0px" : "1rem"}`,
        overflow: "hidden",
      }}
    />
  );
};

export default VideoPlayer;
