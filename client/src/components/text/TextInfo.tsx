import { Typography } from "@mui/material";

interface Props {
    text: string;
    start?: boolean;
}

const TextInfo = ({ text, start }: Props) => {
    return (
        <Typography
            variant="body2"
            textAlign={start ? "start" : "center"}
            color="text.secondary"
        >
            {text}
        </Typography>
    );
};

export default TextInfo;
