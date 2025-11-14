import { Routes, Route, } from "react-router-dom";
import Home from "./page/Home";
import AboutMe from "./page/AboutMe";
import Donate from "./page/Donate";
import AboutProject from "./page/AboutProject";
import GamePage from "./page/GamePage";
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/aboutproject" element={<AboutProject/>}/>
            <Route path="/donate" element={<Donate/>}/>
            <Route path="/game-random" element={<GamePage mode="random"/>}/>
            <Route path="/game-her" element={<GamePage mode="her"/>}/>

        </Routes>
    )
}