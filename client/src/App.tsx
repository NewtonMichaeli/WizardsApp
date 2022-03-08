import React from 'react'
import { Routes, Route } from 'react-router-dom'
// Utils:
import { GetUserDetails } from './utils/middlewares/Dashboard.middleware'
import { GoToDashboard } from './utils/GotoDashboard'
import UINotifications from './utils/UINotifications'
// Components:
import Navbar from './components/Navbar'
// Pages:
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterWizardCreator from './pages/RegisterWIzardCreator'
import Dashboard from './pages/Dashboard'
import WizardStats from './pages/WizardStats'
import WizardEditor from './pages/WizardEditor'
import { GetUserWizard } from './utils/middlewares/WizardEditor.middleware'
import { GetUserWizardForm } from './utils/middlewares/WizardForm.middleware'
import WizardForm from './pages/WizardForm'
import { GetWizardStatistics } from './utils/middlewares/WizardStats.middleware'
import { LoadUserBeforeCreatingWizardCreator } from './utils/middlewares/CreateWizardCreator.middleware'


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
          path="/create-wizard-creator"
          element={
            <LoadUserBeforeCreatingWizardCreator children={<RegisterWizardCreator />} />}
          />
        <Route 
          path="/dashboard"
          element={<GetUserDetails children={<Dashboard />} />}
          />
        <Route 
          path="/view/:id"
          element={<GetWizardStatistics children={<WizardStats />} />}
          />
        <Route 
          path="/edit/:id"
          element={<GetUserWizard children={<WizardEditor />} />} 
          />
        <Route 
          path="/wizard/:id"
          element={<GetUserWizardForm children={<WizardForm />} />} 
          />
          <Route 
          path='/' 
          element={<>Home</>}
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
