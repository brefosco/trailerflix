import Header from "../components/Header";
import MediaRow from "../components/MediaRow";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { t } from "i18next";
import {
  fetchMedia,
  selectMovies,
  selectTVShows,
  selectMediaStatus,
} from "../slices/mediaSlice";
import DarkBackgroundWrapper from "../components/DarkBackgroundWrapper";
import { MediaType } from "../types/media";
import { useFetchMedia } from "../hooks/useFetchMedia";

function Watch() {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(selectMediaStatus);
  const movies = useAppSelector(selectMovies);
  const tvShows = useAppSelector(selectTVShows);

  const handleFetchMedia = (mediaType: MediaType) => {
    dispatch(fetchMedia(mediaType));
  };

  useFetchMedia(handleFetchMedia, () => {}, undefined, requestStatus);

  return (
    <DarkBackgroundWrapper>
      <Header />
      <div className="">
        {requestStatus === "loading" ? (
          <div className="mx-8 py-4" data-cy="watch-loading">
            {t("LOADING")}
          </div>
        ) : (
          <>
            <div>
              <MediaRow title={t("POPULAR_MOVIES")} data={movies} />
            </div>
            <br />
            <div>
              <MediaRow title={t("POPULAR_TV")} data={tvShows} />
            </div>
          </>
        )}
      </div>
    </DarkBackgroundWrapper>
  );
}

export default Watch;
