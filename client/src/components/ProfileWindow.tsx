import React from 'react'
import Default_User_Img from '../assets/user.png'
import Admin_User_Img from '../assets/user-status/User-admin.png'
import WizardCreator_User_Img from '../assets/user-status/User-wizard.creator.png'
// Styles:
import Styles from '../styles/components/ProfileWindow.module.css'

// Profile window component - used in <Navbar.tsx>
const ProfileWindow: React.FC = () => {

  const userDetails = {
    // -- dummy user object
    username: "Artemix",
    email: "natanelmich103@gmail.com",
    userStatus: "User",
    isLoggedIn: true
  }

  return (
    <div className={Styles["ProfileWindow"]}>
        <section className={Styles["profile-top-section"]}>
          <img draggable="false" src={Default_User_Img} alt="Profile Picture" />
          <h1 className={Styles["user-username"]}>{userDetails.username}</h1>
          <h2 className={Styles["user-email"]}>{userDetails.email}</h2>
        </section>
        <section className={Styles["profile-btm-section"]}>
          <div className={Styles["user-status-section"]}>
            <h2 className={Styles["user-status"]}>{userDetails.userStatus}</h2>
            <a href='/' className={Styles["learn-more"]}>Learn More</a>
          </div>
          <button onClick={() => signButtonHandler(userDetails.isLoggedIn)} className={Styles["sign-out-btn"]}>
            <span>Sign Out</span>
          </button>
        </section>
    </div>
  )
}

// Sign Button handler
const signButtonHandler = (isLoggedIn: boolean) => {
  if (isLoggedIn === false)
    // -- goto signin
    // window.location.href = '/signup';
    console.log('not logged in')
  else
    // -- log out code
    console.log('logged in already')
}


export default ProfileWindow