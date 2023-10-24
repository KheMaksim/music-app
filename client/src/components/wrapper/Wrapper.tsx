import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    noColumn?: boolean;
}

const Wrapper = ({ children, noColumn }: Props) => {
    return noColumn ? (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingTop: 2,
                gap: 2,
            }}
        >
            {children}
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: 2,
                gap: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default Wrapper;
