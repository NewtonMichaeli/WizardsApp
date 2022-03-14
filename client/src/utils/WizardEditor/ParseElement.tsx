// Elements Parser 
import React from 'react'
import { InputTypes, ValidInputType } from '../../interfaces/WizardFormat'
// Input fields:
import { Checkbox, CheckboxList, Image, ImagesList, Label, ListsList, Radiobox, RadioboxList, Range, SecuredInput, Text, Textarea } from './Input'
import { QuestionTypes } from '../../redux/types'


type ParseElement__props = React.FC<{
  element: ValidInputType,
  page: number,
  section: number,
  question: number,
}>
const ParseElement: ParseElement__props = ({element, question, page, section}) => {

  // switch element type
  const path = { question, page, section }

  switch (element.type)
  {
    case QuestionTypes.LABEL:
      return <Label element={element as InputTypes['Label']} path={path} />
    case QuestionTypes.TEXT:
      return <Text element={element as InputTypes['Text']} path={path} />
    case QuestionTypes.TEXTAREA:
      return <Textarea element={element as InputTypes['Textarea']} path={path} />
    case QuestionTypes.SECURED_INPUT:
      return <SecuredInput element={element as InputTypes['SecuredInput']} path={path} />
    case QuestionTypes.NUMBER:
      return <Range element={element as InputTypes['Number']} path={path} />
    case QuestionTypes.RADIOBOX_LIST:
      return <RadioboxList element={element as InputTypes['Radiobox List']} path={path} />
    case QuestionTypes.CHECKBOX_LIST:
      return <CheckboxList element={element as InputTypes['Checkbox List']} path={path} />
    case QuestionTypes.IMAGE_LIST:
      return <ImagesList element={element as InputTypes['Image List']} path={path} />
    case QuestionTypes.LISTS_LIST:
      return <ListsList element={element as InputTypes['Lists List']} path={path} />
    default:
      return <></>
  }
}

export default ParseElement