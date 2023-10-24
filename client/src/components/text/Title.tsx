import { Typography } from "@mui/material";

interface Props {
    text: string;
    start?: boolean;
}

const Title = ({ text, start }: Props) => {
    return (
        <Typography
            variant="h4"
            textAlign={start ? "start" : "center"}
            textTransform="uppercase"
        >
            {text}
        </Typography>
    );
};

export default Title;
