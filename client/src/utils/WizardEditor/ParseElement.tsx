// Elements Parser 
import React from 'react'
import { ValidInputType } from '../../interfaces/WizardFormat'
// Input fields:
import { InputStruct } from '../../components/WizardEditor/InputField'


type ParseElement__props = React.FC<{
  element: ValidInputType,
  page: number,
  section: number,
  question: number,
}>
const ParseElement: ParseElement__props = ({element, question, page, section}) => {
  // switch lelement type
  const path = {
    question, page, section
  }
  return <InputStruct element={element} path={path} />
  
  // switch (element.type)
  // {
  //   case QuestionTypes.LABEL:
  //     return <Label element={element} path={path} />
  //   case QuestionTypes.TEXT:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.TEXTAREA:
  //     return <Textarea element={element} path={path} />
  //   case QuestionTypes.SECURED_INPUT:
  //     return <SecuredText element={element} path={path} />
  //   case QuestionTypes.RANGE:
  //     return <SecuredText element={element} path={path} />
      
  //   case QuestionTypes.CHECKBOX:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.IMAGE:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.RADIOBOX_LIST:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.CHECKBOX_LIST:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.LISTS_LIST:
  //     return <Text element={element} path={path} />
  //   case QuestionTypes.RADIOBOX:
  //     return <Text element={element} path={path} />
  //   default:
  //     return <></>
  // }
}

export default ParseElement