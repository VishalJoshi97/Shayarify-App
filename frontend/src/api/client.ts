import axios from "axios";
import {getToken, removeToken, removeUser} from "../utils/storage";

//Base URL
//http://10.94.181.198:8080/api
const client = axios.create({
    baseURL: "http://172.16.26.157:8080/api",
});

//For POST req and any req with Authorization and Bearer token
client.interceptors.request.use(
    async (config) =>
    {
    const token = await getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//AUTO LOGOUT ON 401
client.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("🔴 Token expired → logging out");

            await removeToken();
            await removeUser();

            //reload app
            window.location.href = "/(auth)/login";
        }

        return Promise.reject(error);
    }
);

export default client;