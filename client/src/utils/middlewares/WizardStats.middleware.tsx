// Utils : Middlewares : Gets user wizard statistics form before entering access-stricted page

import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { bindActionCreators } from 'redux'
import { RootState, UserActions, WizardFormActions, WizardStatsActions } from '../../redux'
import { useDispatch } from 'react-redux'


// Gets User Details before Rendering Component
export const GetWizardStatistics: React.FC<{children: JSX.Element}> = ({children}) => {
  // Dispatch
  const dispatch = useDispatch()
  // Get UserData
  const { id } = useParams();
  const { LoadUser } = bindActionCreators(UserActions, dispatch)
  const { MapResultsToState } = bindActionCreators(WizardStatsActions, dispatch)
  // Handlers
  const LoadUserAndSpecificWizard = async (id: string) => {
    await LoadUser()
    await MapResultsToState()
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
