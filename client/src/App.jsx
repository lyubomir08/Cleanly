import { Routes, Route } from "react-router";

import { UserProvider } from "./contexts/UserContext.jsx";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ServiceCreate from "./components/service/service-create/ServiceCreate.jsx";
import ServiceCatalog from "./components/service/service-catalog/ServiceCatalog.jsx";
import ServiceDetails from "./components/service/service-details/ServiceDetails.jsx";
import ServiceEdit from "./components/service/service-edit/ServiceEdit.jsx";
import Profile from "./components/profile/Profile.jsx";
import BookingCreate from "./components/booking/booking-create/BookingCreate.jsx";
import About from "./components/about/About.jsx";
import ArticlesCatalog from "./components/blog/articles-catalog/ArticlesCatalog.jsx";
import ArticlesEdit from "./components/blog/articles-edit/ArticlesEdit.jsx";

import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

import "./App.css";

function App() {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<ServiceCatalog />} />
                        <Route path="/services/:id/details" element={<ServiceDetails />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/articles" element={<ArticlesCatalog />} />

                        <Route element={<PublicRoute />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>

                        <Route element={<AdminRoute />}>
                            <Route path="/services/add" element={<ServiceCreate />} />
                            <Route path="/services/:id/edit" element={<ServiceEdit />} />
                        </Route>

                        <Route element={<PrivateRoute />}>
                            <Route path="/services/:id/book" element={<BookingCreate />} />
                            <Route path="/articles/:id/edit" element={<ArticlesEdit />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </UserProvider>
    );
}

export default App;
