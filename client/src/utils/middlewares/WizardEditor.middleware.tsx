// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { bindActionCreators } from 'redux'
import { UserActions, WizardEditorActions } from '../../redux'
import { useDispatch } from 'react-redux'
import { SetPageTitle } from '../../redux/actions/User'


// Gets User Details before Rendering Component
export const GetUserWizard: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { id } = useParams();
  const { ExtractWizard } = bindActionCreators(WizardEditorActions, useDispatch())
  const { LoadUser, GetWizards } = bindActionCreators(UserActions, useDispatch())
  // Handlers
  const LoadUserAndSpecificWizard = async (id: string) => {
    await LoadUser()
    await GetWizards()
    await ExtractWizard(id)
  }
  useEffect(() => {
    if (id)
      LoadUserAndSpecificWizard(id)
    else
      window.location.href = '/dashboard'
  }, [])
  return children
}
