import React from 'react'
import Default_User_Img from '../assets/user.png'
import Admin_User_Img from '../assets/user-status/User-admin.png'
import WizardCreator_User_Img from '../assets/user-status/User-wizard-creator.png'
// Redux:
import { RootState } from '../redux'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../redux/action-types/Auth'
import { PushFeedback } from '../redux/actions/UI'
import { UIAction } from '../redux/action-types/UI'
// Styles:
import Styles from '../styles/components/ProfileWindow.module.css'
import { UserRoleTypes } from '../redux/action-types/User'
import { getStyles } from '../controllers'


// Profile Window props type
type ProfileWindow__props = React.FC<{UserData: RootState['user']['UserData']}>

// Profile window component - used in <Navbar.tsx>
const ProfileWindow: ProfileWindow__props = ({UserData}) => {

  // Dispatch
  const dispatch: Dispatch<AuthAction | UIAction> = useDispatch()
  // States
  let UserRoleTypeImg: string   // image path
  if (UserData?.role === UserRoleTypes.WIZARD_CREATOR) UserRoleTypeImg = WizardCreator_User_Img
  else if (UserData?.role === UserRoleTypes.ADMIN) UserRoleTypeImg = Admin_User_Img
  else UserRoleTypeImg = Default_User_Img
  // Handlers
  const signOutHandler = () => {
    dispatch({type: AuthActionTypes.LOGOUT_SUCCESS})
    dispatch(PushFeedback(true, "Logged out successfully"))
  }

  return (
    <div className={getStyles(Styles, `ProfileWindow ${UserData?.role === UserRoleTypes.ADMIN
      ? 'profile-window-admin'
      : ''}`)}>
      <section className={Styles["profile-top-section"]}>
        <img draggable="false" src={UserRoleTypeImg} alt="Profile Picture" />
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
        <div className={Styles["profile-controllers"]}>
          {UserData?.role === UserRoleTypes.ADMIN 
            ? <button onClick={() => window.location.href = '/create-wizard-creator'} className={getStyles(Styles, "control-btn create-wizard-creator-btn")}>
              <span>Create Wizard Creator</span>
            </button>
            : ''}
          <button onClick={(signOutHandler)} className={getStyles(Styles, "control-btn sign-out-btn")}>
            <span>Sign Out</span>
          </button>
          </div>
      </section>
    </div>
  )
}

export default ProfileWindow