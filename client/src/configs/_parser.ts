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
export const ExtractDataToStatsWizard = (wizard_results: ServerResultsType[]): MappedUserResultsType => {
  let results: MappedUserResultsType = {}
  // Map each User answer
  wizard_results.map(result => {
    // Questions object (name:question pairs)
    let result_questions: ResultQuestions = {}
    // Map every question to name:question-paired object
    result.results.pages.map(page => {
      page.map(section => {
        section.elements.map(question => {
          // Extract sub-questions from lists-list
          if (question.type === QuestionTypes.LISTS_LIST)
          question.elements.map(list => result_questions[list.name] = {...list})
          // Treat as normal element
          else result_questions[question.name] = {...question}
        })
      })
    })
    // Insert question-stats to total results as a specific user
    results[result.username] = { ...result_questions }
  })
  // return total answers mapped as username:questions_by_name
  return results
}
