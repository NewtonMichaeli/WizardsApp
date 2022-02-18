// Elements Parser 
import React from 'react'
import { ValidInputType } from '../../interfaces/WizardFormat'
// Input fields:
import { Label, Text, Textarea, SecuredText } from '../../components/WizardEditor/InputField'


type ParseElement__props = React.FC<{
  element: ValidInputType,
  page_idx: number,
  section_idx: number,
  q_idx: number,
}>
const ParseElement: ParseElement__props = ({element, q_idx, page_idx, section_idx}) => {
  // switch lelement type
  const path = {
    q_idx, page_idx, section_idx
  }
  
  switch (element.type)
  {
    case "Label":
      return <Label element={element} path={path} />
    case "Text":
      return <Text element={element} path={path} />
    case "Textarea":
      return <Textarea element={element} path={path} />
    case "SecuredInput":
      return <SecuredText element={element} path={path} />
    case 'Range':
      return <SecuredText element={element} path={path} />
    default:
      return <></>
  }
}

export default ParseElement