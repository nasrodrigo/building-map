import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Components/Map";
import Login from "./Components/Login";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
