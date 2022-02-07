import React from 'react'
import { Routes, Route } from 'react-router-dom'
// Components:
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route 
          path="/signin"
          element={<Login />}
        />
        <Route 
          path="/signup"
          element={<Register />}
        />
        <Route 
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </div>
  );
}

export default App;
