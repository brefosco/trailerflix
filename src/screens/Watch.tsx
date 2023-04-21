import Header from "../components/Header";
import MediaRow from "../components/MediaRow";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { t } from "i18next";
import {
  fetchMedia,
  selectMovies,
  selectTVShows,
  selectMediaStatus,
  getFavoriteMedia,
  selectMedia,
  loadWatched,
} from "../slices/mediaSlice";
import DarkBackgroundWrapper from "../components/DarkBackgroundWrapper";
import { selectUser } from "../slices/userSlice";
import { MediaItem, MediaType } from "../types/media";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFetchMedia } from "../hooks/useFetchMedia";

function Watch() {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(selectMediaStatus);
  const movies = useAppSelector(selectMovies);
  const tvShows = useAppSelector(selectTVShows);
  const { sessionId, isLoggedIn, accountInfo } = useAppSelector(selectUser);
  const { favoriteMovies, favoriteTV, watchedMedia } =
    useAppSelector(selectMedia);

  const handleLoadWatched = (data: MediaItem[]) => {
    dispatch(loadWatched(data));
  };

  const handleFetchMedia = (mediaType: MediaType) => {
    dispatch(fetchMedia(mediaType));
  };

  const handleFetchFavoriteMedia = (mediaType: MediaType) => {
    if (accountInfo?.id) {
      const accountId = accountInfo.id;
      dispatch(getFavoriteMedia({ accountId, sessionId, mediaType }));
    }
  };

  useLocalStorage<MediaItem[]>(
    "watched-media",
    watchedMedia,
    handleLoadWatched,
    [watchedMedia]
  );

  useFetchMedia(
    handleFetchMedia,
    handleFetchFavoriteMedia,
    accountInfo,
    requestStatus
  );

  const favoriteMoviesWithType = favoriteMovies.map((mov) => ({
    ...mov,
    media_type: MediaType.Movie,
  }));

  const favoriteTVWithType = favoriteTV.map((show) => ({
    ...show,
    media_type: MediaType.TV,
  }));

  return (
    <DarkBackgroundWrapper>
      <Header />
      <div className="">
        {isLoggedIn ? (
          <>
            {requestStatus === "loading" ? (
              <div className="mx-8 py-4" data-cy="watch-loading">
                {t("LOADING")}
              </div>
            ) : (
              <>
                <div>
                  <MediaRow title={t("WATCHED_MEDIA")} data={watchedMedia} />
                </div>
                <br />
                <div>
                  <MediaRow
                    title={t("FAVORITE_MOVIES")}
                    data={favoriteMoviesWithType}
                  />
                </div>
                <br />
                <div>
                  <MediaRow
                    title={t("FAVORITE_TV")}
                    data={favoriteTVWithType}
                  />
                </div>
                <br />
                <div>
                  <MediaRow title={t("POPULAR_MOVIES")} data={movies} />
                </div>
                <br />
                <div>
                  <MediaRow title={t("POPULAR_TV")} data={tvShows} />
                </div>
              </>
            )}
          </>
        ) : null}
        <br />
      </div>
    </DarkBackgroundWrapper>
  );
}

export default Watch;
