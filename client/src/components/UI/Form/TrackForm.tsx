import {
    useState,
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
} from "react";
import { Box, Button, Grid } from "@mui/material";
import FormElement from "./FormElement";
import IArtist from "@/interfaces/IArtist";
import IOption from "@/interfaces/IOption";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAlbums, postTrack } from "@/features/musicAction";
import ITrackData from "@/interfaces/ITrackData";
import { useNavigate } from "react-router-dom";

interface State extends ITrackData {
    artistId: string;
}

interface Props {
    artists: IArtist[];
}

const TrackForm = ({ artists }: Props) => {
    const [state, setState] = useState<State>({
        name: "",
        duration: "",
        artistId: "",
        albumId: "",
    });

    const albums = useAppSelector((state) => state.music.albums);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const artistOptions = artists.map((artist) => {
        const option: IOption = {
            title: artist.name,
            id: artist.id,
        };
        return option;
    });

    const getAlbumsArray = useCallback(() => {
        dispatch(getAlbums(Number(state.artistId)));
    }, [state.artistId]);

    const albumOptions = albums.map((album) => {
        const option: IOption = {
            title: album.title,
            id: album.id,
        };
        return option;
    });

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            if (key !== "artistId") return formData.append(key, value);
        });
        const newTrack: ITrackData = {
            name: state.name,
            duration: state.duration,
            albumId: Number(state.albumId).toString(),
        };
        dispatch(postTrack(newTrack))
            .unwrap()
            .then(() => navigate("/"));
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        name === "artistId"
            ? setState((prevState) => {
                  return { ...prevState, [name]: value, albumId: "" };
              })
            : setState((prevState) => {
                  return { ...prevState, [name]: value };
              });
    };

    useEffect(() => {
        getAlbumsArray();
    }, [state.artistId]);

    return (
        <Box
            component={"form"}
            autoComplete="off"
            onSubmit={submitFormHandler}
            paddingY={2}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <FormElement
                        multiline
                        label="Artist"
                        value={state.artistId}
                        onChange={inputChangeHandler}
                        name="artistId"
                        select
                        options={artistOptions}
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        multiline
                        label="Album"
                        value={state.albumId}
                        onChange={inputChangeHandler}
                        name="albumId"
                        select
                        options={albumOptions}
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="Track name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="Track duration"
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name="duration"
                    />
                </Grid>

                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TrackForm;
