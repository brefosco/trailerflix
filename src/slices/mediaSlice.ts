import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FetchFavoriteMedia, MediaItem, MediaType } from "../types/media";
import {
  fetchFavoriteMediaApi,
  fetchMediaApi,
  handleFavoritesApi,
} from "../services/";
interface MediaState {
  movies: MediaItem[];
  tvShows: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
  favoriteTV: MediaItem[];
  favoriteMovies: MediaItem[];
  watchedMedia: MediaItem[];
}

const initialState: MediaState = {
  movies: [],
  tvShows: [],
  status: "idle",
  error: undefined,
  favoriteTV: [],
  favoriteMovies: [],
  watchedMedia: [],
};

export const selectMovies = (state: RootState) => state.media.movies;

export const selectTVShows = (state: RootState) => state.media.tvShows;

export const selectMediaStatus = (state: RootState) => state.media.status;

export const selectMedia = (state: RootState) => state.media;

export const fetchMedia = createAsyncThunk(
  "media/fetchMedia",
  async (mediaType: MediaType) => {
    const response = await fetchMediaApi(mediaType);

    return response.data;
  }
);

export const getFavoriteMedia = createAsyncThunk(
  "media/getFavoriteMedia",
  async ({ accountId, sessionId, mediaType }: FetchFavoriteMedia) => {
    const response = await fetchFavoriteMediaApi({
      accountId,
      sessionId,
      mediaType,
    });
    return response.data;
  }
);

export const handleFavorites = createAsyncThunk(
  "media/handleFavorites",
  async (
    {
      accountId,
      sessionId,
      mediaId,
      mediaType,
      favorite,
    }: {
      accountId: number;
      sessionId: string;
      mediaId: number;
      mediaType: MediaType;
      favorite: boolean;
    },
    { dispatch }
  ) => {
    const response = await handleFavoritesApi({
      accountId,
      sessionId,
      mediaId,
      mediaType,
      favorite,
    });
    mediaType === MediaType.Movie
      ? dispatch(
          getFavoriteMedia({
            accountId,
            sessionId,
            mediaType: MediaType.Movies,
          })
        )
      : dispatch(getFavoriteMedia({ accountId, sessionId, mediaType }));

    return response.data;
  }
);

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    addToWatched: (state, action: PayloadAction<MediaItem>) => {
      state.watchedMedia.push(action.payload);
    },
    removeFromWatched: (state, action: PayloadAction<MediaItem>) => {
      state.watchedMedia = state.watchedMedia.filter(
        (media) => media.id !== action.payload.id
      );
    },
    loadWatched: (state, action: PayloadAction<MediaItem[]>) => {
      if (action.payload) {
        state.watchedMedia = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMedia.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMedia.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchMedia.fulfilled, (state, action) => {
      state.status = "succeeded";

      action.meta.arg === MediaType.Movie
        ? (state.movies = action.payload.results)
        : (state.tvShows = action.payload.results);
    });
    builder.addCase(handleFavorites.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(handleFavorites.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(handleFavorites.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
      }
    });

    builder.addCase(getFavoriteMedia.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getFavoriteMedia.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getFavoriteMedia.fulfilled, (state, action) => {
      state.status = "succeeded";
      action.meta.arg.mediaType === MediaType.Movies
        ? (state.favoriteMovies = action.payload.results)
        : (state.favoriteTV = action.payload.results);
    });
  },
});

export const { addToWatched, removeFromWatched, loadWatched } =
  mediaSlice.actions;
export default mediaSlice.reducer;
