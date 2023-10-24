import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FileInput from "./FileInput";
import FormElement from "./FormElement";
import IArtist from "@/interfaces/IArtist";
import IOption from "@/interfaces/IOption";
import { useAppDispatch } from "@/hooks/hooks";
import { postAlbum } from "@/features/musicAction";
import { useNavigate } from "react-router-dom";

interface State {
    title: string;
    year: string;
    artistId: string;
    image: string;
}

interface Props {
    artists: IArtist[];
}

const AlbumForm = ({ artists }: Props) => {
    const [state, setState] = useState<State>({
        title: "",
        year: "",
        artistId: "",
        image: "",
    });

    const artistOptions = artists.map((artist) => {
        const option: IOption = {
            title: artist.name,
            id: artist.id,
        };
        return option;
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });
        dispatch(postAlbum(formData))
            .unwrap()
            .then(() => navigate("/"));
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files ? e.target.files[0] : "";
        setState((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

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
                        label="Album title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="Release year"
                        value={state.year}
                        onChange={inputChangeHandler}
                        name="year"
                    />
                </Grid>

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
                    <FileInput
                        label="Image"
                        onChange={fileChangeHandler}
                        name="image"
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

export default AlbumForm;
