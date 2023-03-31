import { useState, useRef } from "react";

import MediaCard from "./MediaCard";
import { MediaItem } from "../types/media";
interface MediaRowProps {
  data: MediaItem[];
  title?: string;
}
function MediaRow({ data, title }: MediaRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const newPosition = scrollPosition + (direction === "left" ? -400 : 400);
      rowRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <>
      {data.length ? (
        <div data-cy={title} className="relative">
          {title && (
            <h3 className="text-2xl font-bold mx-8 py-4 text-white">{title}</h3>
          )}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 bg-opacity-60 text-white p-3 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 bg-opacity-60 text-white p-3 rounded-full"
          >
            &gt;
          </button>
          <div
            ref={rowRef}
            className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory mx-8"
            data-cy="media-row"
          >
            {data
              ? data.map((media: MediaItem) => {
                  return (
                    <MediaCard
                      data-cy={media.title}
                      key={media.poster_path}
                      media={media}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default MediaRow;