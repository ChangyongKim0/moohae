// import logo from "./logo.svg";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MemoPage from "./pages/MemoPage";
import HomePage from "./pages/HomePage";
import MathEqPage from "./pages/MathEqPage";
import MarkDownPage from "./pages/MarkDownPage";
import ThreeJsPage from "./pages/ThreeJsPage";
import ThreeJsTorusPage from "./pages/ThreeJsTorusPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/memo" element={<MemoPage />} />
      <Route path="/math-eq" element={<MathEqPage />} />
      <Route path="/markdown" element={<MarkDownPage />} />
      <Route exact path="/three-js" element={<ThreeJsPage />} />
      <Route path="/three-js/torus" element={<ThreeJsTorusPage />} />
    </Routes>
  );
}

export default App;
