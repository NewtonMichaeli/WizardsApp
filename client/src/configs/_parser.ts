// Config file - parsers

// Types:
import { WizardFormat, WizardPageFormat } from "../interfaces/WizardFormat"
import { MappedUserResultsType, QuestionTypes, ResultQuestions, ServerResultsType } from "../redux/types"


// Parses server response to actual wizard format
export const ExtractDataToWizard = (server_wizard: any): WizardFormat => {
  const wizard_content = JSON.parse(server_wizard.content)
  return {
    name: (wizard_content.name as string),
    id: (server_wizard.id as string),
    pages: (wizard_content?.pages as WizardPageFormat[]) ?? []  
  }
}


// Parses server response to actual wizard format
export const MapAnswersDataToState = (wizard_results: ServerResultsType[]): MappedUserResultsType => {
  let results: MappedUserResultsType = {}
  // Map each User answer
  wizard_results.map(result => {
    // add username to results
    results[result.username] = {}
    result.data.map(question => {
      // add question to username
      results[result.username][question.name] = {...question}
    })
  })
  // return total answers mapped as username:questions_by_name
  return results
}
