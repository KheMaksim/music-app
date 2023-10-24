import { Typography } from "@mui/material";

interface Props {
    text: string;
    start?: boolean;
}

const Subtitle = ({ text, start }: Props) => {
    return (
        <Typography
            variant="h6"
            textAlign={start ? "start" : "center"}
            textTransform="uppercase"
        >
            {text}
        </Typography>
    );
};

export default Subtitle;
