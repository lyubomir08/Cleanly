import { get, post } from "./api.js";
import { setUserData, clearUserData } from "../utils/storage.js";

const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
};

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });

    setUserData({
        _id: result.user._id,
        username: result.user.username,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
    });

    return result;
}

export async function register(username, email, password) {
    const result = await post(endpoints.register, { username, email, password });

    setUserData({
        _id: result.user._id,
        username: result.user.username,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
    });

    return result;
}

export async function logout() {
    await get(endpoints.logout);
    clearUserData();
}
