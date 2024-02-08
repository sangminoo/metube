import Link from "next/link";
import { useState } from "react";
import { UserImage, UserName } from "./VideoComponent";

interface CollapsibleProps {
  userId: string;
  userName: string;
  userImageUrl: string;
  followers: number;
  description: string;
}

const Collapsible = ({
  userId,
  userName,
  userImageUrl,
  followers,
  description,
}: CollapsibleProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-4 rounded-md ">
      <div className="">
        <div
          className={`transition-max-height  relative h-auto w-full overflow-hidden ${
            expanded ? "max-h-full" : "max-h-10"
          }`}
        >
          <p className=" whitespace-pre-line leading-5">{description}</p>
        </div>

        {!expanded && (
          <button
            className="  font-semibold text-gray-800  focus:outline-none"
            onClick={toggleExpand}
          >
            ...more
          </button>
        )}
        {expanded && (
          <div className="mt-4 flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Transcript</h2>
            <p>Follow along using the transcript.</p>
            <button
              className="mt-4 w-fit rounded-full border border-gray-300 bg-transparent px-3 py-[5px] font-semibold text-blue-600 hover:bg-blue-100 focus:outline-none"
              type="button"
            >
              Show transcript
            </button>
            {/* Info */}
            <div className="flex flex-row  place-content-between items-center gap-x-4  pt-6">
              <Link href={`/${userId}/ProfileVideos`} key={userId}>
                <div className="flex flex-row gap-2">
                  <div className="flex items-center justify-center rounded-full bg-white p-2">
                    <UserImage
                      image={userImageUrl || ""}
                      className="h-14 w-14"
                    />
                  </div>
                  <button className="flex flex-col justify-center">
                    <UserName
                      name={userName || ""}
                      className="text-lg font-semibold leading-6 text-black"
                    />
                    <p className=" text-sm text-gray-600">
                      {followers}
                      <span> Followers</span>
                    </p>
                  </button>
                 
                </div>
              </Link>
              {/* <FollowButton
                        followingId={user.id}
                        viewer={{
                          hasFollowed: viewer.hasFollowed,
                        }}
                      /> */}
            </div>
            <div className="flex justify-start gap-x-2 w-full pr-10 py-4 ">
                    <button className="rounded-full border border-gray-300 py-2 w-full ">
                      Videos
                    </button>
                    <button className="rounded-full border border-gray-300 py-2 w-full ">
                      About
                    </button>
                  </div>

            <button
              className="mt-4 w-fit font-semibold  text-gray-800 focus:outline-none"
              onClick={toggleExpand}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collapsible;

// import { useState } from 'react';

// const Collapsible = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border border-gray-300 rounded-md mb-4">
//       <div
//         className="flex justify-between items-center p-4 cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h2 className="text-lg font-semibold">{title}</h2>
//         <svg
//           className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//         >
//           <path d="M7 10l5 5 5-5z" />
//         </svg>
//       </div>
//       {isOpen && (
//         <div className="p-4 border-t border-gray-300">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Collapsible;
