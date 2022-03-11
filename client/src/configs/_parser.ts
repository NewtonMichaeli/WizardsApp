// Config file - parsers

// Types:
import { WizardFormat, WizardPageFormat } from "../interfaces/WizardFormat"
import { MappedUserResultsType, QuestionTypes, ResultQuestions, ServerResultsType } from "../redux/types"


// Parses server response to actual wizard format
export const ExtractDataToWizard = (server_wizard: any): WizardFormat => {
  const wizard_content = JSON.parse(server_wizard.content)
  return {
    name: (wizard_content.name as string),
    id: (wizard_content.id as string),
    DoC: (wizard_content.DoC as number),
    canNavigate: (wizard_content.DoC as boolean),
    pages: (wizard_content?.pages as WizardPageFormat[]) ?? []  
  }
}


// Parses server response to actual wizard format
export const ExtractDataToWizardStats = (wizard_results: ServerResultsType[]): MappedUserResultsType => {
  let results: MappedUserResultsType = {}
  // Map each User answer
  wizard_results?.map(result => {
    results[result.username] = result.data
  })
  // return total answers mapped as username:questions_by_name
  return results
}
