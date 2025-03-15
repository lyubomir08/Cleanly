import { createContext, useState, useEffect } from "react";
import { getUserData, clearUserData, setUserData } from "../utils/storage.js";
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "../services/authService.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserData());

    useEffect(() => {
        if (user) {
            setUserData(user);
        } else {
            clearUserData();
        }
    }, []);

    const login = async (email, password) => {
        const result = await apiLogin(email, password);
        setUser(result);
    };

    const register = async (username, email, password, rePassword) => {
        const result = await apiRegister(username, email, password, rePassword);
        setUser(result);
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};