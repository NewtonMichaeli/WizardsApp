// Elements Parser 
import React from 'react'
// Input fields:
import { CheckboxList, Label, ListsList, RadioboxList, Number, SecuredInput, Text, Textarea, ImagesList } from './Input'
import { QuestionTypes } from '../../redux/types'
import { ValidFormInputType } from '../../interfaces/WizardFormat_Form'


type ParseElement__props = React.FC<{
  element: ValidFormInputType,
}>
const ParseElement: ParseElement__props = ({element}) => {

  // switch element type

  switch (element.type)
  {
    case QuestionTypes.LABEL:
      return <Label question={element} />
    case QuestionTypes.TEXT:
      return <Text question={element} />
    case QuestionTypes.TEXTAREA:
      return <Textarea question={element} />
    case QuestionTypes.SECURED_INPUT:
      return <SecuredInput question={element} />
    case QuestionTypes.NUMBER:
      return <Number question={element} />
    case QuestionTypes.IMAGE_LIST:
      return <ImagesList question={element} />
    case QuestionTypes.RADIOBOX_LIST:
      return <RadioboxList question={element} />
    case QuestionTypes.CHECKBOX_LIST:
      return <CheckboxList question={element} />
    case QuestionTypes.LISTS_LIST:
      return <ListsList question={element} />
    default:
      return <></>
  }
}

export default ParseElement