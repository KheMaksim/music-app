import Btn from "@/components/UI/Button/Button";
import TrackItem from "@/components/card/TrackItem";
import Subtitle from "@/components/text/Subtitle";
import TextInfo from "@/components/text/TextInfo";
import Title from "@/components/text/Title";
import Wrapper from "@/components/wrapper/Wrapper";
import { getTracks, publicateTrack, removeTrack } from "@/features/musicAction";
import { addToHistory } from "@/features/user/userActions";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AlbumPage = () => {
    const { id } = useParams();
    const tracks = useAppSelector((state) => state.music.tracks);
    const quantity = useAppSelector((state) => state.music.quantity);
    const album = useAppSelector((state) => state.music.album);
    const artist = useAppSelector((state) => state.music.artist);
    const userInfo = useAppSelector((state) => state.user.userInfo);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const removeHandler = (id: number) => {
        dispatch(removeTrack(id))
            .unwrap()
            .then(() => getTracksArray());
    };

    const publicateHandler = (id: number) => {
        dispatch(publicateTrack(id))
            .unwrap()
            .then(() => getTracksArray());
    };

    const addTrack = (id: number) => {
        dispatch(
            addToHistory({
                trackId: id.toString(),
            })
        );
    };

    const getTracksArray = useCallback(() => {
        dispatch(getTracks(Number(id)));
    }, []);

    useEffect(() => {
        getTracksArray();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Btn
                    text="Back to albums"
                    contained
                    onClickHandler={() => navigate(-1)}
                />
                <Title text={artist.name} />
                <Subtitle text={album.title} />
                <TextInfo
                    text={
                        Number(quantity) === 1
                            ? "1 track"
                            : `${quantity} tracks.`
                    }
                />
                <Wrapper noColumn>
                    {tracks.length < 1 ? (
                        <Subtitle text="No tracks in this album." />
                    ) : (
                        tracks.map((track, index) =>
                            userInfo?.role === "admin" ? (
                                <TrackItem
                                    index={index}
                                    track={track.name}
                                    duration={track.duration}
                                    publicated={track.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === track.userId}
                                    onClickHandler={() => addTrack(track.id)}
                                    removeHandler={() =>
                                        removeHandler(track.id)
                                    }
                                    publicateHandler={() =>
                                        publicateHandler(track.id)
                                    }
                                    key={index}
                                />
                            ) : track.published === true ||
                              (userInfo?.id === track.userId &&
                                  track.published === false) ? (
                                <TrackItem
                                    index={index}
                                    track={track.name}
                                    duration={track.duration}
                                    publicated={track.published}
                                    isAdmin={userInfo?.role === "admin"}
                                    allowDelete={userInfo?.id === track.userId}
                                    onClickHandler={() => addTrack(track.id)}
                                    removeHandler={() =>
                                        removeHandler(track.id)
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

export default AlbumPage;
