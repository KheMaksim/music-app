import Btn from "@/components/UI/Button/Button";
import Item from "@/components/card/Item";
import Subtitle from "@/components/text/Subtitle";
import Title from "@/components/text/Title";
import Wrapper from "@/components/wrapper/Wrapper";
import {
    getAlbums,
    getArtistById,
    publicateAlbum,
    removeAlbum,
} from "@/features/musicAction";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArtistPage = () => {
    const { id } = useParams();
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const albums = useAppSelector((state) => state.music.albums);
    const artist = useAppSelector((state) => state.music.artist);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const continueHandler = (id: number) => {
        navigate("/album/" + id);
    };

    const removeHandler = (id: number) => {
        dispatch(removeAlbum(id))
            .unwrap()
            .then(() => getAlbumsArray());
    };

    const publicateHandler = (id: number) => {
        dispatch(publicateAlbum(id))
            .unwrap()
            .then(() => getAlbumsArray());
    };

    const getAlbumsArray = useCallback(() => {
        dispatch(getAlbums(Number(id)));
    }, []);

    useEffect(() => {
        dispatch(getArtistById(Number(id)));
        getAlbumsArray();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Btn
                    text="Back to artists"
                    contained
                    onClickHandler={() => navigate(-1)}
                />
                <Title text={artist.name} />
                <Wrapper noColumn>
                    {albums.length < 1 ? (
                        <Subtitle text="This artist has no albums." />
                    ) : (
                        albums.map((album, index) =>
                            userInfo?.role === "admin" ? (
                                <Item
                                    image={album.image}
                                    title={album.title}
                                    year={album.year}
                                    publicated={album.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === album.userId}
                                    continueHandler={() =>
                                        continueHandler(album.id)
                                    }
                                    removeHandler={() =>
                                        removeHandler(album.id)
                                    }
                                    publicateHandler={() =>
                                        publicateHandler(album.id)
                                    }
                                    key={index}
                                />
                            ) : album.published === true ||
                              (userInfo?.id === album.userId &&
                                  album.published === false) ? (
                                <Item
                                    image={album.image}
                                    title={album.title}
                                    year={album.year}
                                    publicated={album.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === album.userId}
                                    continueHandler={() =>
                                        continueHandler(album.id)
                                    }
                                    removeHandler={() =>
                                        removeHandler(album.id)
                                    }
                                    publicateHandler={() =>
                                        publicateHandler(album.id)
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

export default ArtistPage;
