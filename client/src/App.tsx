import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// Components:
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => {

  const [UserData, setUserData] = useState<any>({})

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
        <Route 
          path="*"
          element={<GoToFromHome />}
          />
      </Routes>
    </div>
  );
}

const GoToFromHome: React.FC = () => {
  if (localStorage.getItem('token') === null) return(
    <>{window.location.href = '/signin'}</>
  )
  else if (localStorage.getItem('token') === null) return(
    <>{window.location.href = '/dashboard'}</>
  )
  else return (
    <>{null}</>
  )
}

export default App;
