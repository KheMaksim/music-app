import Item from "@/components/card/Item";
import Subtitle from "@/components/text/Subtitle";
import Title from "@/components/text/Title";
import Wrapper from "@/components/wrapper/Wrapper";
import {
    getArtists,
    publicateArtist,
    removeArtist,
} from "@/features/musicAction";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const artists = useAppSelector((state) => state.music.artists);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const continueHandler = (id: number) => {
        navigate("/artist/" + id);
    };

    const removeHandler = (id: number) => {
        dispatch(removeArtist(id))
            .unwrap()
            .then(() => getArtistsArray());
    };

    const publicateHandler = (id: number) => {
        dispatch(publicateArtist(id))
            .unwrap()
            .then(() => getArtistsArray());
    };

    const getArtistsArray = useCallback(() => {
        dispatch(getArtists());
    }, []);

    useEffect(() => {
        getArtistsArray();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Title text="Artists" />
                <Wrapper noColumn>
                    {artists.length < 1 ? (
                        <Subtitle text="No artists yet." />
                    ) : (
                        artists.map((artist, index) =>
                            userInfo?.role === "admin" ? (
                                <Item
                                    image={artist.image}
                                    title={artist.name}
                                    publicated={artist.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === artist.userId}
                                    continueHandler={() =>
                                        continueHandler(artist.id)
                                    }
                                    removeHandler={() =>
                                        removeHandler(artist.id)
                                    }
                                    publicateHandler={() =>
                                        publicateHandler(artist.id)
                                    }
                                    key={index}
                                />
                            ) : artist.published === true ||
                              (userInfo?.id === artist.userId &&
                                  artist.published === false) ? (
                                <Item
                                    image={artist.image}
                                    title={artist.name}
                                    publicated={artist.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === artist.userId}
                                    continueHandler={() =>
                                        continueHandler(artist.id)
                                    }
                                    removeHandler={() =>
                                        removeHandler(artist.id)
                                    }
                                    publicateHandler={() =>
                                        publicateHandler(artist.id)
                                    }
                                    key={index}
                                />
                            ) : null
                        )
                    )}
                </Wrapper>
            </Wrapper>
        </Container>
    );
};

export default MainPage;
