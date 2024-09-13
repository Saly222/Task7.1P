import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './routes/NavBar';
import Login from './routes/Login';
import './App.css';
import SignUp from './routes/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="Login" element={<Login />} />
        <Route path='Signup' element={<SignUp/>} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
