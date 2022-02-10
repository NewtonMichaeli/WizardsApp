// Reducer's initial state types

// Auth state type
export interface auth_state_type
{
  token: string | null,
  isAuthed: boolean | null,
  isLoading: boolean,
}

// UI state type
export interface ui_state_type {
  status: boolean
  msg: string | null
}
