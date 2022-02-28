// Reducer's initial state types

import { ElementTypes, QuestionTypes, MappedUserResultsType } from ".";
import { WizardFormat, WizardPageFormat } from "../../interfaces/WizardFormat";
import { WizardFormFormat, WizardFormPageFormat } from "../../interfaces/WizardFormat_Form";
import { ValidServerFormInputType, WizardServerFormFormat } from "../../interfaces/WizardFormat_Server";
import { UserRoleTypes } from "../action-types/User";
import { WizardEditorActionTypes } from "../action-types/WizardEditor";


// Auth state type
export interface auth_state_type
{
  token: string | null,
  isAuthed: boolean | null,
  isLoading: boolean,
}


// UI state type
export interface ui_state_type {
  notifications: {
    status: boolean
    msg: string
    id: number
  }[]
  ui_counter: number
}


// User state type
export interface user_state_type {
  isLoading: boolean
  isAuthed: boolean
  UserData: {
    username: string
    email: string,
    role: UserRoleTypes.USER | UserRoleTypes.WIZARD_CREATOR | UserRoleTypes.ADMIN,
    wizards: WizardFormat[],
    results: WizardFormat[],
    isAddingWizard: boolean
  } | null
}


// Wizard_editor state type
export interface wizard_editor_state_type {
  IsAction: boolean
  ActionTrigger: {
    Type: ElementTypes | null
    QuestionType?: QuestionTypes
  }
  ActionType:
    WizardEditorActionTypes.ADDING_ELEMENT |
    WizardEditorActionTypes.RELOCATING_ELEMENT | null
  // current wizard state - questions, sections, etc.. :
  WizardState: WizardFormat | null
  WizardResults: WizardFormat | null
  Page: WizardPageFormat | null
  PageIdx: number
}


// Wizard_form state type
export interface wizard_form_state_type {
  // current wizard state - questions, sections, etc.. :
  Wizard: WizardFormFormat | null         // -- editable Form
  Answer: WizardServerFormFormat | null   // -- sent form to server
  Page: WizardFormPageFormat | null
  PageIdx: number
}


// Wizard_stats state type
export interface wizard_stats_state_type {
  // current wizard state - questions, sections, etc.. :
  Wizard: WizardServerFormFormat | null         // -- server-format form
  // map users-answers to a name:answer pairs
  AllAnswers: MappedUserResultsType | null
  // loading indicator - will mark-false when reducer finishes mapping data to 'AllAnswers'
  isLoading: boolean
}


// const a: wizard_stats_state_type['AllAnswers'] = {
//   username1: {
//     q1: {
//       type: QuestionTypes.CHECKBOX,
//       name: 'q1'
//     },
//     q2: {
//       type: QuestionTypes.NUMBER,
//       name: 'q2',
//       value: 2
//     }
//   }
// }