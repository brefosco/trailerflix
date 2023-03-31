import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import DarkBackgroundWrapper from "../components/DarkBackgroundWrapper";
import Header from "../components/Header";
import { useApiDetailedMedia } from "../hooks/useApiDetailedMedia";
import {
  DetailedMovie,
  DetailedTVShow,
  MediaType,
  Video,
} from "../types/media";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  handleFavorites,
  selectMedia,
  addToWatched,
  removeFromWatched,
} from "../slices/mediaSlice";
import { t } from "i18next";
import { selectUser } from "../slices/userSlice";
import AddFavoriteButton from "../components/AddFavoriteButton";
import AddWatchedButton from "../components/AddWatchedButton";
import { useEffect } from "react";

const getMovieTeasersAndTrailers = ({
  videos,
}: DetailedMovie | DetailedTVShow) => {
  if (videos) {
    const trailersAndTeasers = videos.results.filter((res: Video) => {
      return res.type === "Trailer" || res.type === "Teaser";
    });

    return trailersAndTeasers;
  }
  return false;
};

function TrailerPlayer() {
  const location = useLocation();
  const media = location.state;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, overview, media_type, id, name } = media;
  const { data, loading } = useApiDetailedMedia(id, media_type);
  const videos = getMovieTeasersAndTrailers(data);
  const dispatch = useAppDispatch();
  const { favoriteMovies, favoriteTV, watchedMedia } =
    useAppSelector(selectMedia);
  const { sessionId, accountInfo } = useAppSelector(selectUser);

  const foundFavoriteMedia =
    favoriteMovies?.find((med) => med.id === id) ??
    favoriteTV?.find((show) => show.id === id);

  const foundWatchedMedia = watchedMedia?.find((media) => media.id === id);

  const handleMarkAsFavorite = () => {
    if (accountInfo)
      dispatch(
        handleFavorites({
          accountId: accountInfo.id,
          sessionId,
          mediaId: id,
          mediaType: media_type,
          favorite: true,
        })
      );
  };

  const handleRemoveFromFavorites = () => {
    if (accountInfo)
      dispatch(
        handleFavorites({
          accountId: accountInfo.id,
          sessionId,
          mediaId: id,
          mediaType: media_type,
          favorite: false,
        })
      );
  };

  const handleAddToWatched = () => {
    dispatch(addToWatched(media));
  };

  const handleRemoveFromWatched = () => {
    dispatch(removeFromWatched(media));
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <DarkBackgroundWrapper>
      <Header />
      <div>
        {location.state ? (
          <div>
            <div className="flex justify-between mt-10 px-8 py-4">
              <h3 className="font-bold text-2xl" data-cy="media-title">
                {media_type === MediaType.Movie ? title : name}
              </h3>
              <div className="flex">
                <div className="my-1 mx-4">
                  <AddWatchedButton
                    foundWatchedMedia={!!foundWatchedMedia}
                    handleAdd={handleAddToWatched}
                    handleRemove={handleRemoveFromWatched}
                  />
                </div>
                <div className="mx-4">
                  <AddFavoriteButton
                    foundFavoriteMedia={!!foundFavoriteMedia}
                    handleAdd={handleMarkAsFavorite}
                    handleRemove={handleRemoveFromFavorites}
                  />
                </div>
              </div>
            </div>
            <section className="px-8 py-16">
              <h4 className="font-semibold">{t("OVERVIEW")}:</h4>
              <p>{overview}</p>
            </section>
            <div className="px-8 py-4 w-full">
              {videos ? (
                <ReactPlayer
                  width="100%"
                  muted={false}
                  playing={true}
                  url={`https://www.youtube.com/watch?v=${videos[0]?.key}`}
                />
              ) : loading ? (
                <div className="px-8 py-4 w-full">{t("LOADING")}</div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>{t("NO_MEDIA_LOADED")}</div>
        )}
      </div>
    </DarkBackgroundWrapper>
  );
}

export default TrailerPlayer;
