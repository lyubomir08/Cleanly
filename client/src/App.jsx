import { Routes, Route } from "react-router";

import { UserProvider } from "./contexts/UserContext.jsx";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ServiceCreate from "./components/service/service-create/ServiceCreate.jsx";

import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";

import "./App.css";
import ServiceCatalog from "./components/service/service-catalog/ServiceCatalog.jsx";
import ServiceDetails from "./components/service/service-details/ServiceDetails.jsx";

function App() {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/services/add" element={<ServiceCreate />} />
                        </Route>
                        <Route path="/services" element={<ServiceCatalog />} />
                        <Route path="/services/:id/details" element={<ServiceDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </UserProvider>
    );
}

export default App;
