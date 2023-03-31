const baseUrl: string = import.meta.env.VITE_BASE_API_URL;

export const api = async (url: string, config?: RequestInit) => {
  const abortController = new AbortController();
  const response = await fetch(`${baseUrl}${url}`, {
    signal: abortController.signal,
    ...config,
  });
  if (response.ok) {
    const data = await response.json();
    return {
      status: response.status,
      data,
      url: response.url,
    };
  }
  throw new Error(response.statusText);
};
