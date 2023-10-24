import uploadsPath from "@/constants/uploadsURL";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Subtitle from "../text/Subtitle";
import TextInfo from "../text/TextInfo";
import Btn from "../UI/Button/Button";
import { MouseEventHandler } from "react";
import imageNotAvailable from "@/assets/imageNotAvailable.png";

interface Props {
    image: string;
    title: string;
    year?: string;
    allowDelete?: boolean;
    isAdmin?: boolean;
    publicated?: boolean;
    continueHandler: MouseEventHandler<HTMLButtonElement>;
    removeHandler: MouseEventHandler<HTMLButtonElement>;
    publicateHandler: MouseEventHandler<HTMLButtonElement>;
}

const Item = ({
    image,
    title,
    year,
    allowDelete,
    isAdmin,
    publicated,
    continueHandler,
    removeHandler,
    publicateHandler,
}: Props) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: 250,
                padding: 3,
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

            <CardMedia
                sx={{
                    height: 180,
                    width: 180,
                    borderRadius: "50%",
                }}
                image={image === "" ? imageNotAvailable : uploadsPath + image}
                title="artist"
            />
            <CardContent>
                <Subtitle text={title} />
                {year ? <TextInfo text={year} /> : null}
            </CardContent>
            <CardActions>
                <Btn
                    text="Learn More"
                    contained
                    onClickHandler={continueHandler}
                />
            </CardActions>
        </Card>
    );
};

export default Item;
