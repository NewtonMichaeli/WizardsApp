// Utils : Middlewares : Gets user wizard form before entering access-stricted page

import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { bindActionCreators } from 'redux'
import { RootState, UserActions, WizardFormActions } from '../../redux'
import { useDispatch } from 'react-redux'
import { SetPageTitle } from '../../redux/actions/User'


// Gets User Details before Rendering Component
export const GetUserWizardForm: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { id } = useParams();
  const { ExtractWizardForm } = bindActionCreators<RootState, any>(WizardFormActions, useDispatch())
  const { LoadUser } = bindActionCreators(UserActions, useDispatch())
  // Handlers
  const LoadUserAndSpecificWizard = async (id: string) => {
    await LoadUser()
    await ExtractWizardForm(id)
  }
  useEffect(() => {
    if (id)
      LoadUserAndSpecificWizard(id)
    else
      // window.location.href = '/'
      console.log('err')
  }, [])
  return children
}
