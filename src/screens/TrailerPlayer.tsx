import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import DarkBackgroundWrapper from "../components/DarkBackgroundWrapper";
import Header from "../components/Header";
import { useApiDetailedMedia } from "../hooks/useApiDetailedMedia";
import { MediaType, Video } from "../types/media";
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
import { useEffect, useMemo } from "react";
import { BackIcon } from "../components/Icons";

function TrailerPlayer() {
  const location = useLocation();
  const navigate = useNavigate();

  const media = location.state;

  useEffect(() => {
    if (!media) {
      navigate("/watch");
    }
  }, []);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, overview, media_type, id, name } = media;
  const { data, loading } = useApiDetailedMedia(id, media_type);
  const dispatch = useAppDispatch();
  const { favoriteMovies, favoriteTV, watchedMedia } =
    useAppSelector(selectMedia);
  const { sessionId, accountInfo } = useAppSelector(selectUser);

  const foundFavoriteMedia =
    favoriteMovies?.find((med) => med.id === id) ??
    favoriteTV?.find((show) => show.id === id);

  const foundWatchedMedia = watchedMedia?.find((media) => media.id === id);

  const getMovieTeasersAndTrailers = useMemo(() => {
    if (data?.videos) {
      const trailersAndTeasers = data.videos.results.filter((res: Video) => {
        return res.type === "Trailer" || res.type === "Teaser";
      });

      return trailersAndTeasers;
    }
    return [];
  }, [data]);

  const videos = getMovieTeasersAndTrailers;
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

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <DarkBackgroundWrapper>
      <Header />
      <div>
        {media ? (
          <div>
            <div className="flex justify-between mt-10 px-8 py-4">
              <div className="flex">
                <button onClick={handleBack} className="mr-10">
                  <BackIcon />
                </button>
                <h3 className="font-bold text-2xl mt-1" data-cy="media-title">
                  {media_type === MediaType.Movie ? title : name}
                </h3>
              </div>
              <div className="flex">
                <div className="my-1 mx-4">
                  <AddWatchedButton
                    foundWatchedMedia={!!foundWatchedMedia}
                    handleAdd={handleAddToWatched}
                    handleRemove={handleRemoveFromWatched}
                  />
                </div>
                {sessionId && (
                  <div className="mx-4">
                    <AddFavoriteButton
                      foundFavoriteMedia={!!foundFavoriteMedia}
                      handleAdd={handleMarkAsFavorite}
                      handleRemove={handleRemoveFromFavorites}
                    />
                  </div>
                )}
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
                  // playing={true}
                  playing={false}
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
