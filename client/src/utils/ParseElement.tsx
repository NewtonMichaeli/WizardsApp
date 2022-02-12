// Elements Parser 
import React from 'react'
import { ValidInputType } from '../interfaces/WizardFormat'


const ParseElement: React.FC<{element: ValidInputType}> = ({element}) => {
  // switch lelement type
  switch (element.type)
  {
    case "Label":
      return <label>{element.title}</label>
    case "Checkbox":
      return <input type="checkbox" placeholder={element.title} />
    case "Text":
      return <input type="text" placeholder={element.title} />
    case "SecuredInput":
      return <input type="password" placeholder={element.title} />
    default:
      return <></>
  }
}

export default ParseElement