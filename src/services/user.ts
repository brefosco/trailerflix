import { api } from "../utils/api";

const apiKey: string = import.meta.env.VITE_TMDB_KEY;

export const getRequestTokenApi = async () => {
  const response = await api(`authentication/token/new?api_key=${apiKey}`);
  return response;
};

export const getSessionIdApi = async (approvedToken: string) => {
  const bodyObject = {
    request_token: approvedToken,
  };
  const response = await api(`/authentication/session/new?api_key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  });

  return response;
};

export const logOutSessionApi = async (sessionId: string) => {
  const body = {
    session_id: sessionId,
  };
  const response = await api(`/authentication/session?api_key=${apiKey}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response;
};

interface ValidateWithLogin {
  requestToken: string;
  username: string;
  password: string;
}

export const validateWithLoginApi = async ({
  requestToken,
  username,
  password,
}: ValidateWithLogin) => {
  const body = {
    request_token: requestToken,
    username,
    password,
  };

  const response = await api(
    `/authentication/token/validate_with_login?api_key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return response;
};

export const getAccountDetailsApi = async (sessionId: string) => {
  const response = await api(
    `/account?api_key=${apiKey}&session_id=${sessionId}`
  );

  return response;
};
