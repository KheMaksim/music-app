import { Card, CardActions, CardContent } from "@mui/material";
import Subtitle from "../text/Subtitle";
import TextInfo from "../text/TextInfo";
import Btn from "../UI/Button/Button";
import { MouseEventHandler } from "react";

interface Props {
    index: number;
    track: string;
    duration: string;
    numeration?: string;
    datetime?: string;
    allowDelete?: boolean;
    isAdmin?: boolean;
    publicated?: boolean;
    onClickHandler?: MouseEventHandler<HTMLButtonElement>;
    removeHandler?: MouseEventHandler<HTMLButtonElement>;
    publicateHandler?: MouseEventHandler<HTMLButtonElement>;
}

const TrackItem = ({
    index,
    track,
    duration,
    numeration,
    datetime,
    allowDelete,
    isAdmin,
    publicated,
    onClickHandler,
    removeHandler,
    publicateHandler,
}: Props) => {
    return (
        <Card
            sx={{
                width: "100%",
                paddingInline: 3,
                paddingTop: 2,
                paddingBottom: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "9px 12px 13px 3px rgba(34, 60, 80, 0.3)",
                },
            }}
        >
            {allowDelete || isAdmin ? (
                <CardActions
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                    }}
                >
                    {isAdmin && !publicated ? (
                        <Btn
                            text="Publicate"
                            color="success"
                            onClickHandler={publicateHandler}
                        />
                    ) : null}
                    {allowDelete && !publicated ? (
                        <TextInfo text="Not published" />
                    ) : null}
                    <Btn text="X" remove onClickHandler={removeHandler} />
                </CardActions>
            ) : null}
            <CardContent sx={{ paddingBottom: 0 }}>
                <Subtitle
                    text={`${numeration ? numeration : index + 1}. ${track}`}
                    start
                />
                <TextInfo text={`Duration: ${duration}`} start />
                {datetime ? (
                    <TextInfo text={`Listenning date: ${datetime}`} start />
                ) : null}
            </CardContent>
            {onClickHandler ? (
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {publicated ? (
                        <Btn
                            text={"Listen"}
                            contained
                            onClickHandler={onClickHandler}
                        />
                    ) : (
                        <Btn
                            text={"Listen"}
                            contained
                            disabled
                            onClickHandler={onClickHandler}
                        />
                    )}
                </CardActions>
            ) : null}
        </Card>
    );
};

export default TrackItem;
