import Btn from "@/components/UI/Button/Button";
import TrackItem from "@/components/card/TrackItem";
import Subtitle from "@/components/text/Subtitle";
import Title from "@/components/text/Title";
import Wrapper from "@/components/wrapper/Wrapper";
import { getHistory } from "@/features/user/userActions";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import ITrackHistoryResponse from "@/interfaces/ITrackHistoryResponse";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
    const [tracksHistory, setTracksHistory] = useState<ITrackHistoryResponse[]>(
        []
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getTracksArray = () => {
        dispatch(getHistory())
            .unwrap()
            .then(() => {
                const history = useAppSelector(
                    (state) => state.user.tracksHistory
                );
                setTracksHistory(history);
            });
    };

    const timeConverter = (date: string): string => {
        const newDate = new Date(date);

        const formattedDate =
            (newDate.getDate() < 10
                ? `0${newDate.getDate()}`
                : `${newDate.getDate()}`) +
            "." +
            (newDate.getMonth() < 9
                ? `0${newDate.getMonth() + 1}`
                : `${newDate.getMonth() + 1}`) +
            `.${newDate.getFullYear()} ` +
            (newDate.getHours() < 10
                ? `0${newDate.getHours()}:`
                : `${newDate.getHours()}:`) +
            (newDate.getMinutes() < 10
                ? `0${newDate.getMinutes()}`
                : `${newDate.getMinutes()}`);
        return formattedDate;
    };

    useEffect(() => {
        getTracksArray();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Btn
                    text="Back"
                    contained
                    onClickHandler={() => navigate(-1)}
                />
                <Title text="Your listening history" />
                <Wrapper noColumn>
                    {tracksHistory.length < 1 ? (
                        <Subtitle text="No tracks played yet."></Subtitle>
                    ) : (
                        tracksHistory.map((track, index) => (
                            <TrackItem
                                key={index}
                                index={index}
                                track={track.track.name}
                                duration={track.track.duration}
                                datetime={timeConverter(track.datetime)}
                            />
                        ))
                    )}
                </Wrapper>
            </Wrapper>
        </Container>
    );
};

export default HistoryPage;
