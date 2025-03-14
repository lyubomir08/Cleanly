import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/UserContext";

export default function AdminRoute() {
    const { user } = useContext(UserContext);

    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
