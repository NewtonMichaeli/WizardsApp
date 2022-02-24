import React from 'react'
import { Routes, Route } from 'react-router-dom'
// Utils:
import { GetUserDetails } from './utils/middlewares/GetUserDetails'
import { GoToDashboard } from './utils/GotoDashboard'
import UINotifications from './utils/UINotifications'
// Components:
import Navbar from './components/Navbar'
// Pages:
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WizardStats from './pages/WizardStats'
import WizardEditor from './pages/WizardEditor'
import { GetUserWizard } from './utils/middlewares/GetUserWizard'


const App: React.FC = () => {
  
  return (
    <div className="App">
      {/* navbar */}
      <Navbar />
      {/* UINotifications */}
      <UINotifications />
      {/* routes */}
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
          path="/edit/:id"
          element={
            <GetUserWizard>
              <GetUserDetails children={<WizardEditor />} />
            </GetUserWizard> 
          } />
        <Route 
          path="*"
          element={<GoToDashboard />}
          />
      </Routes>
    </div>
  );
}

export default App;
