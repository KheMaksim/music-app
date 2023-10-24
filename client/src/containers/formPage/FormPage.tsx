import AlbumForm from "@/components/UI/Form/AlbumForm";
import ArtistForm from "@/components/UI/Form/ArtistForm";
import FormElement from "@/components/UI/Form/FormElement";
import TrackForm from "@/components/UI/Form/TrackForm";
import Title from "@/components/text/Title";
import Wrapper from "@/components/wrapper/Wrapper";
import { getArtists } from "@/features/musicAction";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import IOption from "@/interfaces/IOption";
import { Container, Grid } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

const formOptions: IOption[] = [
    { title: "Artist form", id: 1 },
    { title: "Album form", id: 2 },
    { title: "Track form", id: 3 },
];

const FormPage = () => {
    const [type, setType] = useState("");

    const artists = useAppSelector((state) => state.music.artists);

    const dispatch = useAppDispatch();

    const getArtistsArray = () => {
        dispatch(getArtists());
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value.toString());
    };

    const render = () => {
        if (type === "1") return <ArtistForm />;
        if (type === "2") return <AlbumForm artists={artists} />;
        if (type === "3") return <TrackForm artists={artists} />;
    };

    useEffect(() => {
        getArtistsArray();
    }, []);

    return (
        <>
            <Container>
                <Wrapper>
                    <Title text={"Submission forms"} />
                    <Grid item xs>
                        <FormElement
                            multiline
                            label="Choose your form"
                            value={type}
                            onChange={inputChangeHandler}
                            name="type"
                            select
                            options={formOptions}
                        />
                    </Grid>
                    {render()}
                </Wrapper>
            </Container>
        </>
    );
};

export default FormPage;
