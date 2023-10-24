import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FileInput from "./FileInput";
import FormElement from "./FormElement";
import { postArtist } from "@/features/musicAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

interface State {
    name: string;
    info: string;
    image: string;
}

const ArtistForm = () => {
    const [state, setState] = useState<State>({
        name: "",
        info: "",
        image: "",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });
        dispatch(postArtist(formData))
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
                        label="Artist name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        name="name"
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="Information"
                        value={state.info}
                        onChange={inputChangeHandler}
                        name="info"
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

export default ArtistForm;
