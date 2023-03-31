import { useEffect, useState } from "react";
import { DetailedMovie, DetailedTVShow, MediaType } from "../types/media";
const apiKey: string = import.meta.env.VITE_TMDB_KEY;

export const useApiDetailedMedia = (id: number, mediaType: MediaType) => {
  const [data, setData] = useState<DetailedTVShow | DetailedMovie>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as DetailedTVShow
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&append_to_response=videos`,
          { signal: abortController.signal }
        );
        const newData = await response.json();
        setLoading(false);
        setData(newData);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [id]);

  return { data, loading, error };
};
