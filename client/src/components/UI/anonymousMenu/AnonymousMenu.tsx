import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <Grid container justifyContent={"flex-end"}>
            <Button
                component={Link}
                to={"/register"}
                variant="contained"
                color="inherit"
            >
                Sing Up
            </Button>
            <Button
                component={Link}
                to={"/login"}
                variant="contained"
                color="inherit"
                sx={{
                    marginLeft: "10px",
                }}
            >
                Sing In
            </Button>
        </Grid>
    );
};

export default AnonymousMenu;
