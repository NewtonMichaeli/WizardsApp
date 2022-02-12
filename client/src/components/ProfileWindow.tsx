import React from 'react'
import Default_User_Img from '../assets/user.png'
import Admin_User_Img from '../assets/user-status/User-admin.png'
import WizardCreator_User_Img from '../assets/user-status/User-wizard.creator.png'
// Redux:
import { RootState } from '../redux'
// Styles:
import Styles from '../styles/components/ProfileWindow.module.css'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../redux/action-types/Auth'


// Profile Window props type
type ProfileWindow__props = React.FC<{UserData: RootState['user']['UserData']}>

// Profile window component - used in <Navbar.tsx>
const ProfileWindow: ProfileWindow__props = ({UserData}) => {

  const dispatch: Dispatch<AuthAction> = useDispatch()


  return (
    <div className={Styles["ProfileWindow"]}>
      <section className={Styles["profile-top-section"]}>
        <img draggable="false" src={Default_User_Img} alt="Profile Picture" />
        <h1 className={Styles["user-username"]}>
          {UserData?.username ?? "Guest"}
        </h1>
        <h2 className={Styles["user-email"]}>
          {UserData?.email}
        </h2>
      </section>
      <section className={Styles["profile-btm-section"]}>
        <div className={Styles["user-status-section"]}>
          <h2 className={Styles["user-status"]}>{UserData?.role}</h2>
          <a href='/' className={Styles["learn-more"]}>Learn More</a>
        </div>
        <button onClick={() => dispatch({type: AuthActionTypes.LOGOUT_SUCCESS})} className={Styles["sign-out-btn"]}>
          <span>Sign Out</span>
        </button>
      </section>
    </div>
  )
}

export default ProfileWindow