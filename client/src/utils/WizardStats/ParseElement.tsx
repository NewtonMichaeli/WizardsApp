// Elements Parser 

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Input fields:
import * as StatsInput from './Input_Stats'       // inputs when STATS mode
import * as ResultsInput from './Input_Results'   // inputs when RESULTS mode
// Types:
import { QuestionTypes } from '../../redux/types'
import { ValidInputType } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'
import { wizard_stats_state_type } from '../../redux/types/reducerStateTypes'


type ParseElement__props = React.FC<{
  element: ValidInputType,
  q_idx: number
}>
const ParseElement: ParseElement__props = ({element, q_idx}) => {

  
  // Dispatch
  const dispatch = useDispatch()
  // States
  const { StatsMode } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  
  // switch element type
  // Tab on STATS Mode
  if (StatsMode === 'STATS') switch (element.type)
  {
    case QuestionTypes.LABEL:
      return <StatsInput.Label key={q_idx} question={element} />
    case QuestionTypes.TEXT:
      return <StatsInput.Text key={q_idx} question={element} />
    case QuestionTypes.TEXTAREA:
      return <StatsInput.Textarea key={q_idx} question={element} />
    case QuestionTypes.SECURED_INPUT:
      return <StatsInput.SecuredInput key={q_idx} question={element} />
    case QuestionTypes.NUMBER:
      return <StatsInput.Number key={q_idx} question={element} />
    // case QuestionTypes.IMAGE:
    //   return <Image element={element as InputTypes['Image']} path={path} />
    case QuestionTypes.RADIOBOX_LIST:
      return <StatsInput.RadioboxList key={q_idx} question={element} />
    case QuestionTypes.CHECKBOX_LIST:
      return <StatsInput.CheckboxList key={q_idx} question={element} />
    case QuestionTypes.LISTS_LIST:
      return <StatsInput.ListsList key={q_idx} question={element} />
    default:
      return <></>
  }

  // Tab on RESULTS Mode
  else switch (element.type) {
    case QuestionTypes.LABEL:
      return <ResultsInput.Label key={q_idx} question={element} />
    case QuestionTypes.TEXT:
      return <ResultsInput.Text key={q_idx} question={element} />
    case QuestionTypes.TEXTAREA:
      return <ResultsInput.Textarea key={q_idx} question={element} />
    case QuestionTypes.SECURED_INPUT:
      return <ResultsInput.SecuredInput key={q_idx} question={element} />
    case QuestionTypes.NUMBER:
      return <ResultsInput.Number key={q_idx} question={element} />
    // case QuestionTypes.IMAGE:
    //   return <Image element={element as InputTypes['Image']} path={path} />
    case QuestionTypes.RADIOBOX_LIST:
      return <ResultsInput.RadioboxList key={q_idx} question={element} />
    case QuestionTypes.CHECKBOX_LIST:
      return <ResultsInput.CheckboxList key={q_idx} question={element} />
    case QuestionTypes.LISTS_LIST:
      return <ResultsInput.ListsList key={q_idx} question={element} />
    default:
      return <></>
  }
}

export default ParseElement