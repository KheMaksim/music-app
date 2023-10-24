import { MouseEventHandler } from "react";
import { Button } from "@mui/material";

interface Props {
    text: string;
    color?: string;
    contained?: boolean;
    disabled?: boolean;
    remove?: boolean;
    onClickHandler?: MouseEventHandler<HTMLButtonElement>;
}

const Btn = ({
    text,
    color,
    contained,
    disabled,
    remove,
    onClickHandler,
}: Props) => {
    return remove ? (
        <Button
            size="small"
            onClick={onClickHandler}
            disabled={disabled}
            variant={contained ? "contained" : "text"}
            color="error"
            sx={{
                alignSelf: "flex-start",
                minWidth: 35,
            }}
        >
            {text}
        </Button>
    ) : color === "success" ? (
        <Button
            size="small"
            onClick={onClickHandler}
            disabled={disabled}
            color="success"
            variant={contained ? "contained" : "text"}
            sx={{ alignSelf: "flex-start" }}
        >
            {text}
        </Button>
    ) : (
        <Button
            size="small"
            onClick={onClickHandler}
            disabled={disabled}
            variant={contained ? "contained" : "text"}
            sx={{ alignSelf: "flex-start" }}
        >
            {text}
        </Button>
    );
};

export default Btn;
