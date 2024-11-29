import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";

// Login action
export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        const token = response?.data?.data?.token || null;
        if (token) {
            Cookies.set("auth_token", token, { expires: 1 });
        }
        return response?.data || null;
    } catch (error) {
        throw error;
    }
};

// Register action
export const register = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/register", { email, password });
        const token = response?.data?.data?.token || null;
        if (token) {
            Cookies.set("auth_token", token, { expires: 1 });
        }
        return response?.data;
    } catch (error) {
        throw error;
    }
};
