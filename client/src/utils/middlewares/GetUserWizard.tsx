// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { bindActionCreators } from 'redux'
import { RootState, WizardEditorActions } from '../../redux'
import { useDispatch } from 'react-redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'

// Gets User Details before Rendering Component
export const GetUserWizard: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { ExtractWizard } = bindActionCreators<RootState, any>(WizardEditorActions, useDispatch())
  const { id } = useParams();
  useEffect(() => {
    if (id)
      ExtractWizard(id)
    else 
      window.location.href = '/dashboard'
  }, [])
  return children
}
