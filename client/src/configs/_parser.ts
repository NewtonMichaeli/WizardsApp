// Config file - parsers

// Types:
import { WizardFormat, WizardPageFormat } from "../interfaces/WizardFormat"


// Parses server response to actual wizard format
export const ExtractDataToWizard = (server_wizard: any): WizardFormat => {
  const wizard_content = JSON.parse(server_wizard.content)
  return {
    name: (wizard_content.name as string),
    id: (server_wizard.id as string),
    pages: (wizard_content?.pages as WizardPageFormat[]) ?? []  
  }
}
