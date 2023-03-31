import MediaCard from "../components/MediaCard";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { MediaItem } from "../types/media";
import { BrowserRouter as Router } from "react-router-dom";

describe("MediaCard", () => {
  it("should have src = {baseImgUrl}{media.poster_path}", () => {
    const baseImgUrl: string = "https://image.tmdb.org/t/p/original";
    const mockMedia: MediaItem = {
      adult: false,
      backdrop_path: "sample/backdrop_image.png",
      id: 1,
      title: "Mock media title",
      genre_ids: [1],
      overview: "Mock media overview",
      media_type: "movie",
      original_language: "en",
      popularity: 724.059,
      poster_path: "/sample/image.png",
      vote_average: 7.6,
      vote_count: 2391,
    };
    render(
      <Router>
        <MediaCard media={mockMedia} />
      </Router>
    );

    const card = screen.getByRole("img");
    expect(card).toHaveAttribute("src", `${baseImgUrl}/sample/image.png`);
  });
});
