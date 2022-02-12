// All Input types components, exported seperately
import React from 'react'
// styles:
import Styles from '../../styles/Utils/Input.module.css'
import { ValidInputType } from '../interfaces/WizardFormat'


export const Text: React.FC<{element: ValidInputType}> = ({element}) => {

  return (
    <div className={Styles["Input-Text"]}>
      <title>{element.title}</title>
      <input
        type="text" 
        name={element.name} 
        id={element.name}
        placeholder="Enter your answer"
      />
    </div>
  )
}
