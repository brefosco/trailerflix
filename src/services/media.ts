import { HandleFavorites, MediaType } from "../types/media";
import { api } from "../utils/api";

const apiKey: string = import.meta.env.VITE_TMDB_KEY;

export const fetchMediaApi = async (mediaType: string) => {
  const response = await api(`trending/${mediaType}/week?api_key=${apiKey}`);
  return response;
};
interface FetchFavoriteMedia {
  accountId: number;
  sessionId: string;
  mediaType: MediaType;
}

export const fetchFavoriteMediaApi = async ({
  accountId,
  sessionId,
  mediaType,
}: FetchFavoriteMedia) => {
  const response = await api(
    `account/${accountId}/favorite/${mediaType}?api_key=${apiKey}&session_id=${sessionId}`
  );
  return response;
};

export const handleFavoritesApi = async ({
  accountId,
  sessionId,
  mediaId,
  mediaType,
  favorite,
}: HandleFavorites) => {
  const body = {
    media_type: mediaType,
    media_id: mediaId,
    favorite,
  };

  const response = await api(
    `account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return response;
};
