// Configs File - Server

// Server URI
export const SERVER_URI = "http://213.137.90.195:5000"

// Server endpoint (POST) - signup
export const SERVER_SIGNUP_URL = SERVER_URI + "/api/auth/signup/"

// Server endpoint (POST) - signup
export const SERVER_SIGNIN_URL = SERVER_URI + "/api/auth/signin/"

// Server endpoint (POST) - create wizard
export const SERVER_CREATE_WIZARD_URL = SERVER_URI + "/api/wizard/create/"

// Server endpoint (GET) - userdetails
export const SERVER_USERDETAILS_URL = SERVER_URI + "/api/auth/"

// Server endpoint (GET) - specific_wizard
export const SERVER_SPECIFIC_WIZARD_URL = SERVER_URI + "/api/wizard/"

// Server endpoint (PATCH) - update wizard
export const SERVER_UPDATE_WIZARD = SERVER_URI + "/api/wizard/"

// Server endpoint (PATCH) - update wizard
export const SERVER_DELETE_WIZARD = SERVER_URI + "/api/wizard/"
