import YoutubeBase from "../Icons/YoutubeBase";

const YoutubeButton = ({
  videoId,
  refetch,
}: {
  videoId: string;
  refetch: () => Promise<unknown>;
}) => {
  return (
    <>
      <button className="btn btn-circle btn-sm"
      onClick={() => window.open(`watch/${videoId}`)}>
        <YoutubeBase className="h-5 w-5 " />
      </button>
    </>
  );
};

export default YoutubeButton;
