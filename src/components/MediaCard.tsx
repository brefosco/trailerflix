import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { MediaItem, MediaType } from "../types/media";
import { useState } from "react";
import { useApiDetailedMedia } from "../hooks/useApiDetailedMedia";

interface MediaCardProps {
  media: MediaItem;
}

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function MediaCard({ media }: MediaCardProps) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { loading } = useApiDetailedMedia(media.id, media.media_type as MediaType);

  return (
    <>
      {loading || !imageLoaded && (
        <Skeleton
          width={170}
          height={250}
        /> /* Adjust width and height based on your needs */
      )}
      <img
        style={imageLoaded ? {} : { display: "none" }}
        onLoad={() => setImageLoaded(true)}
        onClick={() => {
          navigate("/trailer", { state: media });
        }}
        className="mx-4 my-8 object-cover hover:scale-125 w-[170px] snap-start duration-700"
        src={`${baseImgUrl}${media.poster_path}`}
        alt={media.title}
      />
    </>
  );
}
export default MediaCard;
