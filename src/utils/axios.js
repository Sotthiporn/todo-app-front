import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("auth_token") || "";
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (!response) {
            toast.error("Something went wrong.");
            return;
        }

        const { status } = response;
        if (status === 422) {
            const message = response?.data?.message || "Validation failed";
            toast.error(message);
        } else if (status === 424) {
            const message = response?.data?.message || "Something went wrong";
            toast.error({
                title: "Validation Failed",
                description: message,
                variant: "destructive",
            });
        } else if (status === 401) {
            toast.error('Unauthorized');
            Cookies.remove("auth_token");
        } else if (status === 403) {
            toast.error("Permission Denied");
        } else if (status >= 500) {
            toast.error("Internal Server Error");
        }

        return Promise.reject(response);
    }
);

export default axiosInstance;
