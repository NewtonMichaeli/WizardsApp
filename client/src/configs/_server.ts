// Configs File - Server

// Server URI
export const CLIENT_URI = "http://localhost:3000"

// Server URI
export const SERVER_URI = "http://localhost:5000"

// Server endpoint (POST) - signup
export const SERVER_SIGNUP_URL = SERVER_URI + "/api/auth/signup/"

// Server endpoint (POST) - signup
export const SERVER_CREATE_WIZARDCREATOR_URL = SERVER_URI + "/api/auth/signup/"

// Server endpoint (POST) - signup
export const SERVER_FILL_WIZARD_URL = (id: string) => SERVER_URI + `/api/wizards/${id}/fill/`

// Server endpoint (POST) - signup
export const SERVER_SIGNIN_URL = SERVER_URI + "/api/auth/signin/"

// Server endpoint (POST) - create wizard
export const SERVER_CREATE_WIZARD_URL = SERVER_URI + "/api/wizards/create/"

// Server endpoint (GET) - userdetails
export const SERVER_USERDETAILS_URL = SERVER_URI + "/api/auth/"

// Server endpoint (GET) - specific_wizard
export const SERVER_GET_WIZARDS_URL = SERVER_URI + "/api/wizards/"

// Server endpoint (GET) - specific_wizard
export const SERVER_GET_WIZARD_URL = (id: string) => SERVER_URI + "/api/wizards/" + id

// Server endpoint (PATCH) - update wizard
export const SERVER_UPDATE_WIZARD = SERVER_URI + "/api/wizards/"

// Server endpoint (PATCH) - update wizard
export const SERVER_DELETE_WIZARD = SERVER_URI + "/api/wizards/"

// Server endpoint (PATCH) - update wizard
export const SERVER_CHANGE_PAGE_NAVIGATION_STATUS = (id: string) => SERVER_URI + "/api/wizards/" + id + "/changePageNavigationStatus"
