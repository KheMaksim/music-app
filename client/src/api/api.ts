import { apiURL } from "@/constants/apiURL";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: apiURL,
});

export default api;
