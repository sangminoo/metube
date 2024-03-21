import { useState } from "react";

const ThumbnailExtractor = ({ videoUrl }: { videoUrl: string }) => {
  console.log(videoUrl);
  
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const extractThumbnail = () => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setThumbnailUrl(dataUrl);
    });
  };

  console.log(thumbnailUrl);
  
  return (
    <div>
      <button onClick={extractThumbnail}>Extract Thumbnail</button>
      {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" />}
    </div>
  );
};

export default ThumbnailExtractor;
