import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/pages/LandingPage/LandingPage';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
     <Header />
     <LandingPage />
     <main />
     <Footer />
    </div>
    </Router>
  );
}

export default App;
