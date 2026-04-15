import axios from "axios";
import { getToken ,removeToken} from "../utils/storage";
//http://10.94.181.198:8080/api
const client = axios.create({
    baseURL: "http://10.68.241.198:8080/api",
});

client.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 🔥 AUTO LOGOUT ON 401
client.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("🔴 Token expired → logging out");

            await removeToken();

            // optional: reload app
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default client;