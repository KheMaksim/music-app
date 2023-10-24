import { Link } from "react-router-dom";
import "./Header.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import UserMenu from "../UI/userMenu/UserMenu";
import { Button, Grid } from "@mui/material";
import AnonymousMenu from "../UI/anonymousMenu/AnonymousMenu";
import { logoutUser } from "@/features/user/userActions";

const Header = () => {
    const user = useAppSelector((state) => state.user.userInfo);

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="header">
            <Button
                component={Link}
                to={"/"}
                color="inherit"
                variant="contained"
            >
                Home
            </Button>
            {user ? (
                <Grid container justifyContent={"flex-end"}>
                    <Button
                        component={Link}
                        to={"/history"}
                        variant="contained"
                        color="inherit"
                    >
                        Check History
                    </Button>
                    <Button
                        component={Link}
                        to={"/form"}
                        variant="contained"
                        color="inherit"
                        sx={{ ml: 1 }}
                    >
                        Add new
                    </Button>
                    <UserMenu
                        username={user.username}
                        onLogoutHandler={logoutHandler}
                    />
                </Grid>
            ) : (
                <AnonymousMenu />
            )}
        </header>
    );
};

export default Header;
