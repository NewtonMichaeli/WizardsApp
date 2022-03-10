// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
// Redux:
import { bindActionCreators } from 'redux'
import { UserActions, WizardEditorActions } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { SetPageTitle } from '../../redux/actions/User'


// Gets User Details before Rendering Component
export const GetUserDetails: React.FC<{
  id?: string,
  children: JSX.Element
}> = ({children}) => {
  // Get UserData
  const { LoadUser, GetWizards } = bindActionCreators(UserActions, useDispatch())
  // Handlers
  const LoadUserAndWizards = async () => {
    await LoadUser()
    await GetWizards()
  }

  useEffect(() => {
    LoadUserAndWizards()
  }, [])
  return children
}
