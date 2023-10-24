import IAlbum from "@/interfaces/IAlbum";
import IArtist from "@/interfaces/IArtist";
import ITrack from "@/interfaces/ITrack";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IResponseValidateError from "@/interfaces/IResponseValidateError";

interface State {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
    artist: IArtist;
    album: IAlbum;
    quantity: string;
    error: null | string | IResponseValidateError;
}

export const initialState: State = {
    artists: [],
    albums: [],
    tracks: [],
    quantity: "",
    artist: {
        id: 0,
        name: "",
        info: "",
        image: "",
        userId: 0,
        published: false,
    },
    album: {
        id: 0,
        title: "",
        year: "",
        image: "",
        artistId: 0,
        userId: 0,
        published: false,
    },
    error: null,
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setArtists: (state, action: PayloadAction<IArtist[]>) => {
            state.artists = action.payload;
        },
        setAlbums: (state, action: PayloadAction<IAlbum[]>) => {
            state.albums = action.payload;
        },
        setTracks: (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload;
        },
        setArtist: (state, action: PayloadAction<IArtist>) => {
            state.artist = action.payload;
        },
        setAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.album = action.payload;
        },
        setQuantity: (state, action: PayloadAction<string>) => {
            state.quantity = action.payload;
        },
    },
});

export const {
    setArtists,
    setAlbums,
    setTracks,
    setArtist,
    setAlbum,
    setQuantity,
} = musicSlice.actions;
export const musicReducer = musicSlice.reducer;
