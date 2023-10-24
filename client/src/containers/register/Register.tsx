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
import { registerUser } from "@/features/user/userActions";
import Wrapper from "@/components/wrapper/Wrapper";
import Subtitle from "@/components/text/Subtitle";

interface RegisterState {
    username: string;
    password: string;
}

const Register = () => {
    const [state, setState] = useState<RegisterState>({
        username: "",
        password: "",
    });
    const errors = useAppSelector((state) => state.user.registerError);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getErrorsBy = (name: string) => {
        if (Array.isArray(errors)) {
            const error = errors.find(({ type }) => type === name);
            return error?.messages.join(",");
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(registerUser({ ...state }))
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

                <Subtitle text="Sign up" />
                {errors ? (
                    <Alert sx={{ width: "100%", mt: 2 }} severity="error">
                        {errors as string}
                    </Alert>
                ) : null}
                <Box component="form" onSubmit={submitFormHandler} noValidate>
                    <FormElement
                        required
                        label="Login"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        error={getErrorsBy("username")}
                    />

                    <FormElement
                        required
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        error={getErrorsBy("password")}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign up
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/login">
                                Have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Wrapper>
        </Container>
    );
};

export default Register;
