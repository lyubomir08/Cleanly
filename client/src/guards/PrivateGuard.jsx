import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/UserContext";

export default function PrivateGuard() {
    const { user } = useContext(UserContext);

    return user ? <Outlet /> : <Navigate to="/login" />;
}