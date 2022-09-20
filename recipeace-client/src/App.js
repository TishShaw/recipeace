import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home/>} />
        </Routes>
    )
}

export default App;