import { Discussions } from "../Icons/Icons";

const CommentButton = ({
  videoId,
  refetch,
}: {
  videoId: string;
  refetch: () => Promise<unknown>;
}) => {
  return (
    <>
      <button className="btn btn-circle btn-sm disabled" disabled>
        <Discussions className="h-5 w-5 " />
      </button>
    </>
  );
};

export default CommentButton;
