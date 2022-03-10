import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../redux'
import { UserRoleTypes } from '../redux/action-types/User'
import { user_state_type } from '../redux/types/reducerStateTypes'
// Redux:

// Styles:
import Styles from '../styles/pages/Home.module.css'


const Home: React.FC = () => {

  const { UserData } = useSelector<RootState, user_state_type>(state => state.user)

  // Admin
  if (UserData?.role === UserRoleTypes.ADMIN) return (
    <div className={Styles["Home"]}>
      <h2 className={Styles['title']}>Home</h2>
      <NavLink className={Styles['link']} to='/dashboard'>Dashbord</NavLink>
    </div>
  )
  // WizardCreator
  else if (UserData?.role === UserRoleTypes.WIZARD_CREATOR) return (
    <div className={Styles["Home"]}>
      <h2 className={Styles['title']}>Home</h2>
      <NavLink className={Styles['link']} to='/dashboard'>Dashbord</NavLink>
    </div>
  )
  // User
  else if (UserData?.role === UserRoleTypes.USER) return (
    <div className={Styles["Home"]}>
      <h2 className={Styles['title']}>Home</h2>
    </div>
  )
  // Guest
  else return (
    <div className={Styles["Home"]}>
      <h2 className={Styles['title']}>Home</h2>
      <NavLink className={Styles['link']} to='/signin'>Login</NavLink>
      <NavLink className={Styles['link']} to='/signup'>Register</NavLink>
    </div>
  )
}

export default Home
