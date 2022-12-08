import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./templates/user/Login.jsx";
import {Register} from "./templates/user/Register";
import RegisterSuccess from "./templates/user/Register_success.jsx";
import Intro from "./templates/Intro.jsx";
import {HeaderSearch} from "./templates/Fixed/HeaderSearch.jsx";
import FooterSimple from "./templates/Fixed/Footer.jsx";
import Market from "./templates/Market.jsx";
import PostBoard from "./templates/PostBoard.jsx";


export const ENDPOINT = "http://localhost:3000";

function App() {
    return (
        <BrowserRouter>
            <HeaderSearch />
            <Routes>
                <Route path={""} element={<Intro />} />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/register/success"} element={<RegisterSuccess />} />
                <Route path={"/market"} element={<Market/>} />
                <Route path={"/market/post/write"} element={<PostBoard />}/>
            </Routes>
            <FooterSimple/>
        </BrowserRouter>
    )
}

export default App
