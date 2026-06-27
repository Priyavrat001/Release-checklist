import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReleaseDetails from "./pages/ReleaseDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/release/:id" element={<ReleaseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;