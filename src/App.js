import logo from "./logo.svg";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MemoPage from "./pages/MemoPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MemoPage />} />
    </Routes>
  );
}

export default App;
