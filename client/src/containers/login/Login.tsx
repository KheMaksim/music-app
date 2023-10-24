import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import FormElement from "../../components/UI/Form/FormElement";
import { loginUser } from "@/features/user/userActions";
import Wrapper from "@/components/wrapper/Wrapper";
import Subtitle from "@/components/text/Subtitle";

interface LoginState {
    username: string;
    password: string;
}

const Login = () => {
    const error = useAppSelector((state) => state.user.loginError);

    const [state, setState] = useState<LoginState>({
        username: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ ...state }))
            .unwrap()
            .then(() => {
                navigate("/");
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Wrapper>
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "primary.main",
                        alignSelf: "center",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>

                <Subtitle text="Sign in" />

                {error ? (
                    <Alert sx={{ width: "100%", mt: 2 }} severity="error">
                        {error}
                    </Alert>
                ) : null}
                <Box component="form" onSubmit={submitFormHandler}>
                    <FormElement
                        required
                        label="Login"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        required
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/register">
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Wrapper>
        </Container>
    );
};

export default Login;
