import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNotes from "./components/pages/MyNotes/MyNotes";
import SignupPage from "./components/pages/SignupPage/SignupPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import CreateNote from "./components/pages/CreateNote/CreateNote";
import SingleNote from "./components/pages/SingleNote/SingleNote";

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <Router>
      <div className="App">
        <Header setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
