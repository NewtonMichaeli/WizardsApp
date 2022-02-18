// Utils : Middlewares : Gets user details before enttering an important page

import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { bindActionCreators } from 'redux'
import { WizardEditorActions } from '../../redux'
import { useDispatch } from 'react-redux'

// Gets User Details before Rendering Component
export const GetUserWizard: React.FC<{children: JSX.Element}> = ({children}) => {
  // Get UserData
  const { ExtractWizard } = bindActionCreators(WizardEditorActions, useDispatch())
  const { id } = useParams();
  useEffect(() => {
    if (id)
      ExtractWizard(id)
    else 
      window.location.href = '/dashboard'
  }, [])
  return children
}
