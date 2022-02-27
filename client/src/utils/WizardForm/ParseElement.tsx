// Elements Parser 
import React from 'react'
import { InputTypes } from '../../interfaces/WizardFormat'
// Input fields:
import { Checkbox, CheckboxList, Image, Label, ListsList, Radiobox, RadioboxList, Number, SecuredInput, Text, Textarea } from './Input'
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
      return <Label question={element as InputTypes['Label']} />
    case QuestionTypes.TEXT:
      return <Text question={element} />
    case QuestionTypes.TEXTAREA:
      return <Textarea question={element} />
    case QuestionTypes.SECURED_INPUT:
      return <SecuredInput question={element} />
    case QuestionTypes.NUMBER:
      return <Number question={element} />
    // case QuestionTypes.IMAGE:
    //   return <Image element={element as InputTypes['Image']} path={path} />
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