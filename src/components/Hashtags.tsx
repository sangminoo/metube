import React from "react";

interface Props {
  text: string;
}

const Hashtags = ({ text }: Props) => {
  // Sử dụng regex để tìm kiếm và thay thế
  const modifiedString = text.split(/(#\w+)/g).map((part, index) => {
    // Kiểm tra nếu phần tử là một hashtag
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-blue-500">
          {part}
        </span>
      );
    }
    // Ngược lại, trả về phần tử nhưng chuyển đổi thành chuỗi
    return part;
  });

  return <div className="text-black">{modifiedString}</div>;
};
export default Hashtags;
