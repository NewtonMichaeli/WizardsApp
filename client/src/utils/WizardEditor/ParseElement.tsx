// Elements Parser 
import React from 'react'
import { ValidInputType } from '../../interfaces/WizardFormat'
// Input fields:
import { Label, Text, Textarea, SecuredText } from '../../components/WizardEditor/InputField'


const ParseElement: React.FC<{element: ValidInputType}> = ({element}) => {
  // switch lelement type
  switch (element.type)
  {
    case "Label":
      return <Label element={element} />
    case "Text":
      return <Text element={element} />
    case "Textarea":
      return <Textarea element={element} />
    case "SecuredInput":
      return <SecuredText element={element} />
    case 'Range':
      return <SecuredText element={element} />
    default:
      return <></>
  }
}

export default ParseElement