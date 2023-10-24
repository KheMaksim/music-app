import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import "./App.css";
import MainPage from "@/containers/mainPage/mainPage";
import ArtistPage from "@/containers/artistPage/artistPage";
import AlbumPage from "@/containers/albumPage/albumPage";
import Register from "@/containers/register/Register";
import Login from "@/containers/login/Login";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "@/hooks/hooks";
import HistoryPage from "@/containers/historyPage/HistoryPage";
import FormPage from "@/containers/formPage/FormPage";

const App = () => {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route
                        element={
                            <ProtectedRoute
                                isAllowed={!!user}
                                redirectPath={"/login"}
                            />
                        }
                    >
                        <Route path="/album/:id" element={<AlbumPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/form" element={<FormPage />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
