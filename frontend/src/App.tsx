import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/pages/LandingPage/LandingPage';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyNotes from './components/pages/MyNotes/MyNotes';

function App() {
  return (
    <Router>
    <div className="App">
     <Header />
     <Routes>
     <Route path='/' element={<LandingPage/>}/>
     <Route path='/mynotes' element={<MyNotes/>}/>
     </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
