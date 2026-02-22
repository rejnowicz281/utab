import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./components/pages/main-page/main-page";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}
