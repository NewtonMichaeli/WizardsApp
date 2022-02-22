// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
// Redux:
import { bindActionCreators } from 'redux'
import { RootState, UserActions } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { user_state_type } from '../../redux/types/reducerStateTypes'

// Gets User Details before Rendering Component
export const GetUserDetails: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { isAuthed } = useSelector<RootState, user_state_type>(state => state.user)
  const { LoadUser } = bindActionCreators<unknown, typeof UserActions>
    (UserActions, useDispatch())
  useEffect(() => {
    LoadUser()
  }, [])
  return children
}
