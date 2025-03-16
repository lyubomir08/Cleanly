import { get, post, put } from "./api.js";
import { setUserData, clearUserData } from "../utils/storage.js";

const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    profile: "/users/profile",
    allUsers: "/admin/users",
    changeRole: "/admin/users/role",
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
    await post(endpoints.logout, {});

    clearUserData();
}

export async function getProfile() {
    return await get(endpoints.profile);
}

export async function getAllUsers() {
    return await get(endpoints.allUsers);
}

export async function changeUserRole(userId, newRole) {
    return await put(endpoints.changeRole, { userId, newRole });
}
