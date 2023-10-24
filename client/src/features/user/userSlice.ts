import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { loginUser, logoutUser, registerUser } from "./userActions";
import IUserResponseValidateError from "@/interfaces/IResponseValidateError";
import { ITrackHistory } from "@/interfaces/ITrackHistory";
import ITrackHistoryResponse from "@/interfaces/ITrackHistoryResponse";

export interface userState {
    userInfo: IUser | null;
    trackHistory: ITrackHistory;
    tracksHistory: ITrackHistoryResponse[];
    registerError: null | string | IUserResponseValidateError;
    loginError: null | string;
}

const initialState: userState = {
    userInfo: null,
    tracksHistory: [],
    trackHistory: {
        trackId: "",
    },
    registerError: null,
    loginError: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setTracksHistory: (
            state,
            action: PayloadAction<ITrackHistoryResponse[]>
        ) => {
            state.tracksHistory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = { ...action.payload };
                state.registerError = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.registerError = action.payload;
                } else {
                    state.registerError =
                        action.payload?.error.message ?? "Error occurred";
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginError = null;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginError = action.payload || null;
            })
            .addCase(logoutUser.fulfilled, () => {
                return initialState;
            })
            .addCase(logoutUser.rejected, () => {
                return initialState;
            });
    },
});

export const { setTracksHistory } = userSlice.actions;
export const userReducer = userSlice.reducer;
