import Image from "next/image";

export const UserImage = ({
  image,
  className= "",
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div className={`relative h-8 w-8  rounded-full border shadow-inner border-gray-300 ${className}`}>
      <Image
        src={image || "/profile.png"}
        className="absolute rounded-full bg-gray-200"
        alt=""
        fill
      />
    </div>
  );
};
