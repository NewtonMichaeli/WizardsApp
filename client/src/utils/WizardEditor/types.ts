// Types for Input 

export type InputChange = React.ChangeEvent<HTMLInputElement>
export type TextareaChange = React.ChangeEvent<HTMLTextAreaElement>
// ChechboxList, RadioboxList, ..
export type list_input_path_type = {
  page: number,
  section: number,
  question: number,
  option?: number   // sub-option in a list
}
// Checkbox, Radiobox, etc..
export type sub_input_path_type = {
  page: number,
  section: number,
  question: number,
  list?: number,    // defined when an element is inside a list in a list
  option: number    // sub-option in a list
}
// Textarea, ListsList, etc...
export type input_path_type = {
  page: number,
  section: number,
  question: number
}
