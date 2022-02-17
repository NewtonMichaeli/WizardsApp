// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
// Redux:
import { bindActionCreators } from 'redux'
import { UserActions } from '../../redux'
import { useDispatch } from 'react-redux'

// Gets User Details before Rendering Component
export const GetUserDetails: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { LoadUser } = bindActionCreators(UserActions, useDispatch())
  useEffect(() => {
    LoadUser()
  }, [])
  return children
}
