import { useNavigate } from "react-router-dom";
import { MediaItem } from "../types/media";

interface MediaCardProps {
  media: MediaItem;
}

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function MediaCard({ media }: MediaCardProps) {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        navigate("/trailer", { state: media });
      }}
      className="mx-4 my-8 object-cover hover:scale-125 w-[170px] snap-start duration-700"
      src={`${baseImgUrl}${media.poster_path}`}
      alt={media.title}
    />
  );
}
export default MediaCard;
