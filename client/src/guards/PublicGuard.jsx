import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../contexts/UserContext";

export default function PublicGuard() {
    const { user } = useContext(UserContext);

    return user ? <Navigate to="/" /> : <Outlet />;
}
