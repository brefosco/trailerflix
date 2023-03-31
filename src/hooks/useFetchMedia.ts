import { useEffect } from "react";
import { MediaType } from "../types/media";
import { AccountInfo } from "../types/user";

export function useFetchMedia(
  handleFetchMedia: (mediaType: MediaType) => void,
  handleFetchFavoriteMedia: (mediaType: MediaType) => void,
  accountInfo: AccountInfo | undefined,
  requestStatus: string
) {
  useEffect(() => {
    handleFetchFavoriteMedia(MediaType.Movies);
    handleFetchFavoriteMedia(MediaType.TV);
  }, [accountInfo]);

  useEffect(() => {
    if (requestStatus === "idle") {
      handleFetchMedia(MediaType.Movie);
      handleFetchMedia(MediaType.TV);
    }
  }, [handleFetchMedia, requestStatus]);
}
