import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Kwisses from "./pages/Kwisses";
import Players from "./pages/Players";

import CreateKwis from "./pages/CreateKwis";
import EditKwis from "./pages/EditKwis";
import EditPlayer from "./pages/EditPlayer";
import CreatePlayer from "./pages/CreatePlayer";
import Round1 from "./pages/Round1";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Kwisses />} />
            <Route path="/create-kwis" element={<CreateKwis />} />
            <Route path="/edit-kwis/:id" element={<EditKwis />} />
            <Route path="/players" element={<Players />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/edit-player/:id" element={<EditPlayer />} />
            <Route path="/round1/:id" element={<Round1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
