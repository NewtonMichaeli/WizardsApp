// Reducer's init state types

// Auth state type
export interface auth_state_type
{
  token: string | null,
  isAuthed: boolean | null,
  isLoading: boolean,
  user: {
    username: string
    email: string,
    hashedPassword: string,
    role: string
  } | null
}

// UI state type
export interface ui_state_type {
  status: boolean
  msg: string | null
}
