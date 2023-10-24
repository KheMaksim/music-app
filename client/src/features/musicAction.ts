import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import IArtist from "@/interfaces/IArtist";
import {
    setAlbum,
    setAlbums,
    setArtist,
    setArtists,
    setQuantity,
    setTracks,
} from "./musicSlice";
import IAlbum from "@/interfaces/IAlbum";
import ITrackResponse from "@/interfaces/ITrackResponse";
import { RootState } from "@/store/store";
import { AxiosError, isAxiosError } from "axios";
import IResponseError from "@/interfaces/IResponseError";
import ITrack from "@/interfaces/ITrack";
import ITrackData from "@/interfaces/ITrackData";

export const getArtists = createAsyncThunk<void>(
    "music",
    async (_payload, thunkAPI) => {
        const { data: artistsResponse } = await api.get<IArtist[]>("/artists");
        thunkAPI.dispatch(setArtists(artistsResponse));
    }
);

export const getArtistById = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const { data: artistsResponse } = await api.get<IArtist>(
            "/artists/" + payload
        );
        thunkAPI.dispatch(setArtist(artistsResponse));
    }
);

export const postArtist = createAsyncThunk<
    IArtist,
    FormData,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: artistsResponse } = await api
            .post<IArtist>("/artists", payload, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return artistsResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const publicateArtist = createAsyncThunk<
    IArtist,
    number,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: artistsResponse } = await api
            .post<IArtist>("/artists/publish/" + payload, null, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return artistsResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const removeArtist = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            const { data: artistsResponse } = await api.delete(
                "/artists/delete/" + payload,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            thunkAPI.dispatch(setArtists(artistsResponse));
            return artistsResponse;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<IResponseError> = err;
                return thunkAPI.rejectWithValue(
                    error.response?.data.error.message ||
                        "Something went wrong."
                );
            }
            throw err;
        }
    }
);

export const getAlbums = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const { data: AlbumsResponse } = await api.get<IAlbum[]>(
            "/albums?artist=" + payload
        );
        thunkAPI.dispatch(setAlbums(AlbumsResponse));
    }
);

export const postAlbum = createAsyncThunk<
    IAlbum,
    FormData,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: albumsResponse } = await api.post<IAlbum>(
            "/albums",
            payload,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return albumsResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const publicateAlbum = createAsyncThunk<
    IAlbum,
    number,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: albumsResponse } = await api
            .post<IAlbum>("/albums/publish/" + payload, null, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return albumsResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const removeAlbum = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        try {
            const { data: albumsResponse } = await api.delete(
                "/albums/delete/" + payload,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            thunkAPI.dispatch(setAlbums(albumsResponse));
            return albumsResponse;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<IResponseError> = err;
                return thunkAPI.rejectWithValue(
                    error.response?.data.error.message ||
                        "Something went wrong."
                );
            }
            throw err;
        }
    }
);

export const getTracks = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const { data: tracksResponse } = await api.get<ITrackResponse>(
            "/tracks?album=" + payload
        );
        thunkAPI.dispatch(setTracks(tracksResponse.tracks));
        thunkAPI.dispatch(setQuantity(tracksResponse.quantity));
        thunkAPI.dispatch(setAlbum(tracksResponse.tracks[0].album));
    }
);

export const postTrack = createAsyncThunk<
    ITrack,
    ITrackData,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: tracksResponse } = await api.post<ITrack>(
            "/tracks",
            payload,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return tracksResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const publicateTrack = createAsyncThunk<
    ITrack,
    number,
    { rejectValue: IResponseError }
>("music", async (payload, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const token = store.user.userInfo?.token;
    try {
        const { data: trackResponse } = await api
            .post<ITrack>("/tracks/publish/" + payload, null, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => res);
        return trackResponse;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<IResponseError> = err;
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    error: { message: "An error occurred" },
                }
            );
        }
        throw err;
    }
});

export const removeTrack = createAsyncThunk<void, number>(
    "music",
    async (payload, thunkAPI) => {
        const store = thunkAPI.getState() as RootState;
        const token = store.user.userInfo?.token;
        console.log(token);
        console.log(payload);

        try {
            const { data: tracksResponse } = await api
                .delete("/tracks/delete/" + payload, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res);
            thunkAPI.dispatch(setTracks(tracksResponse));
            return tracksResponse;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<IResponseError> = err;
                return thunkAPI.rejectWithValue(
                    error.response?.data.error.message ||
                        "Something went wrong."
                );
            }
            throw err;
        }
    }
);
