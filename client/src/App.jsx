import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";

function App() {
    return (
        <div className="app-container">
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
