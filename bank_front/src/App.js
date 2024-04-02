import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Main from './component/Main';
import Login from './component/Login';

function App() {
    return (
        <Router>
            <div className="allpage">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Main />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;


