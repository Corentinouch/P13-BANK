import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Main from './component/Main';
import Login from './component/Login';
import Profile from './component/Profile';

function App() {
    const location = useLocation();

    return (
        <div className="allpage">
            {location.pathname !== '/profile' && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Main />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
