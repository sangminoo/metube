import Image from "next/image";

const Thumbnail = ({
  thumbnailUrl,
  title,
}: {
  thumbnailUrl: string;
  title?: string;
}) => {
  return (
    <>
      <Image src={thumbnailUrl ?? "/background.jpg"} fill alt={title ?? ""}
        className="absolute inset-0  rounded-xl object-cover"
      />
    </>
  );
};

export default Thumbnail;
