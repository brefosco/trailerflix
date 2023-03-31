import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getAccountDetailsApi,
  getRequestTokenApi,
  getSessionIdApi,
  logOutSessionApi,
  validateWithLoginApi,
} from "../services/";
import { AccountInfo } from "../types/user";

interface UserState {
  requestToken: string;
  sessionId: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
  accountInfo?: AccountInfo;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  requestToken: "",
  sessionId: "",
  status: "idle",
  error: undefined,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  accountInfo: {} as AccountInfo,
  isLoggedIn: false,
};

export const getRequestToken = createAsyncThunk(
  "user/getRequestToken",
  async () => {
    const response = await getRequestTokenApi();
    return response.data;
  }
);

export const getSessionId = createAsyncThunk(
  "/user/getSessionId",
  async (approvedToken: string, { dispatch }) => {
    const response = await getSessionIdApi(approvedToken);
    dispatch(getAccountDetails(response.data.session_id));
    return response.data;
  }
);

export const logOutSession = createAsyncThunk(
  "user/logOutSession",
  async (sessionId: string, { dispatch }) => {
    const response = await logOutSessionApi(sessionId);
    dispatch(getRequestToken());
    return response.data;
  }
);
interface ValidateWithLogin {
  requestToken: string;
  username: string;
  password: string;
}

export const validateWithLogin = createAsyncThunk(
  "user/validateWithLogin",
  async (
    { requestToken, username, password }: ValidateWithLogin,
    { dispatch }
  ) => {
    const response = await validateWithLoginApi({
      requestToken,
      username,
      password,
    });

    dispatch(getSessionId(response.data.request_token));
    return response.data;
  }
);

export const getAccountDetails = createAsyncThunk(
  "user/getAccountDetails",
  async (sessionId: string) => {
    const response = await getAccountDetailsApi(sessionId);
    return response.data;
  }
);

export const selectUser = (state: RootState) => state.user;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRequestToken.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getRequestToken.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getRequestToken.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.requestToken = action.payload.request_token;
    });

    builder.addCase(getSessionId.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getSessionId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getSessionId.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.status = "succeeded";
        state.sessionId = action.payload.session_id;
        state.isLoggedIn = true;
      }
    });

    builder.addCase(getAccountDetails.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getAccountDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accountInfo = action.payload;
    });

    builder.addCase(validateWithLogin.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(validateWithLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(validateWithLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    builder.addCase(logOutSession.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logOutSession.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.isLoggedIn = false;
    });

    builder.addCase(logOutSession.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.sessionId = "";
      state.isLoggedIn = false;
    });
  },
});

export default userSlice.reducer;
