import React, { useEffect, useState } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
// Utils:
import { GetUserDetails } from './utils/GetUserDetails'
import { GoToDashboard } from './utils/GotoDashboard'
// Components:
import Navbar from './components/Navbar'
// Pages:
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WizardStats from './pages/WizardStats'


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
          element={<GetUserDetails children={<Dashboard />} />}
          />
        <Route 
          path="/view/:id"
          element={<GetUserDetails children={<WizardStats />} />}
          />
        <Route 
          path="*"
          element={<GoToDashboard />}
          />
      </Routes>
    </div>
  );
}

export default App;
