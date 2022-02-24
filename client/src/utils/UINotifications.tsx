import React, { useEffect } from 'react'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { UIAction } from '../redux/action-types/UI'
// Types:
import { RootState } from '../redux'
import { ui_state_type } from '../redux/types/reducerStateTypes'
// Styles:
import Styles from '../styles/Utils/UINotifications.module.css'
import { getStyles } from '../controllers'
import { ClearFeedback } from '../redux/actions/UI'


// Sub component
const Notification: React.FC<{
  notification: {msg: string, status: boolean, id: number},
  isLast?: boolean
}> = ({notification, isLast}) => {
  // Render Notification
  return (
    <div className={getStyles(Styles, `UINotification ${notification.status
    ? "good-msg"
    : "bad-msg"}`)}>
      <span>
        {notification.msg}
      </span>
    </div>
  )
}


const UINotifications: React.FC = () => {

  // Dispatch
  const dispatch_ui = useDispatch<Dispatch<UIAction>>()
  // States
  const { notifications, ui_counter }  = useSelector<RootState, ui_state_type>(state => state.ui)

  // Clear last feedback
  useEffect(() => {
    if (ui_counter)
      setTimeout(() => dispatch_ui(ClearFeedback()), 4000)
  }, [notifications])

  return (
    <div className={Styles["UINotificationsTable"]}>
      {/* render first 3 notifications */}
      {notifications.map(notification => 
        <Notification key={notification.id} notification={notification} />)}
    </div>
  )
}

export default UINotifications
