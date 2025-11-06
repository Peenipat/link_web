import { Routes, Route, } from "react-router-dom";
import Home from "./page/Home";
import AboutMe from "./page/AboutMe";
import Donate from "./page/Donate";
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/donate" element={<Donate/>}/>

        </Routes>
    )
}