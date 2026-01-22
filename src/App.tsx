import { Routes,Route } from "react-router-dom";

import Start from "./pages/start/start";
import TakeImages from "./pages/takeImages/takeImages";
import ProcessImage from "./pages/processImage/processImage";

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/takeImages" element={<TakeImages/>} />
        <Route path="/processImage" element={<ProcessImage/>} />
      </Routes>
    </>
  )
}

