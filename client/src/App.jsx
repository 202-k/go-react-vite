// import './App.css'

// import "./templates/comp.css"
import Login from "./templates/user/Login.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {Register} from "./templates/user/Register";
import Intro from "./templates/Intro.jsx";
import {HeaderSearch} from "./templates/HeaderSearch.jsx";

export const ENDPOINT = "http://localhost:3000";

function App() {
    return (
        <BrowserRouter>
            <HeaderSearch />
            <Routes>
                <Route path={""} element={<Intro />} />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/register"} element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
