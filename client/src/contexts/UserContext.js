import { createContext, useState, useEffect } from 'react';
import { getUserData, clearUserData } from '../utils/storage.js';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/authService.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getUserData();

        if (storedUser) {
            setUser(storedUser);
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
        clearUserData(null);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};