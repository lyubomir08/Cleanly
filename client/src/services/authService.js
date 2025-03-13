import { get, post } from "../api/api.js";
import { setUserData, clearUserData } from "../utils/storage.js";

const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
};

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });

    setUserData({
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        token: result.token,
    });

    return result;
}

export async function register(username, email, password, rePassword) {
    const result = await post(endpoints.register, { username, email, password, rePassword });

    setUserData({
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        token: result.token,
    });

    return result;
}

export async function logout() {
    await get(endpoints.logout);
    clearUserData();
}
