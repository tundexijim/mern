import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/pages/LandingPage/LandingPage';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyNotes from './components/pages/MyNotes/MyNotes';
import SignupPage from './components/pages/SignupPage/SignupPage';
import LoginPage from './components/pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
    <div className="App">
     <Header />
     <Routes>
     <Route path='/' element={<LandingPage/>}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path='/signup' element={<SignupPage/>}/>
     <Route path='/mynotes' element={<MyNotes/>}/>
     </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
