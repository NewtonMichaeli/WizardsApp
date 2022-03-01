// Elements Parser 
import React from 'react'
import { InputTypes } from '../../interfaces/WizardFormat'
// Input fields:
import { Checkbox, CheckboxList, /*Image,*/ Label, ListsList, Radiobox, RadioboxList, Number, SecuredInput, Text, Textarea } from './Input_Stats'
import { QuestionTypes } from '../../redux/types'
import { ValidInputType } from '../../interfaces/WizardFormat'


type ParseElement__props = React.FC<{
  element: ValidInputType,
  q_idx: number
}>
const ParseElement: ParseElement__props = ({element, q_idx}) => {

  // switch element type

  switch (element.type)
  {
    case QuestionTypes.LABEL:
      return <Label key={q_idx} question={element} />
    case QuestionTypes.TEXT:
      return <Text key={q_idx} question={element} />
    case QuestionTypes.TEXTAREA:
      return <Textarea key={q_idx} question={element} />
    case QuestionTypes.SECURED_INPUT:
      return <SecuredInput key={q_idx} question={element} />
    case QuestionTypes.NUMBER:
      return <Number key={q_idx} question={element} />
    // case QuestionTypes.IMAGE:
    //   return <Image element={element as InputTypes['Image']} path={path} />
    case QuestionTypes.RADIOBOX_LIST:
      return <RadioboxList key={q_idx} question={element} />
    case QuestionTypes.CHECKBOX_LIST:
      return <CheckboxList key={q_idx} question={element} />
    case QuestionTypes.LISTS_LIST:
      return <ListsList key={q_idx} question={element} />
    default:
      return <></>
  }
}

export default ParseElement