import Image from "next/image";
import { UserImage } from "./Components";
import Heart from "./Icons/Heart";

interface UserHeartProps {
  userImageUrl: string;
  className?: string;
}

const UserHeart = ({ userImageUrl }: UserHeartProps) => {
  return (
    <>
   
      <div className="relative h-4 w-4  bg-gray-300 rounded-full ">
        <Image className="absolute rounded-full" src={userImageUrl} alt="" fill/>
        <Heart className="absolute -bottom-2 -right-2 h-4 w-4 " />
      </div>
    </>
  );
};

export default UserHeart;
