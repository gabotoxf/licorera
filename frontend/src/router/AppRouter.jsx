import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Home from "../pages/Home";
// import Orders from "../pages/Orders";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}
