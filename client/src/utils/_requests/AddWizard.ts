// Get all wizards from server

import axios from 'axios'

const SERVER_URL = 'http://213.137.90.195:5000/'

// Callback function params
export type AddWizard_callback_props = {
    (status: boolean, id: string | null): void
}

// Tries to get all data & wizards from the server
export default (callback: AddWizard_callback_props) =>
{
    const token = window.localStorage.getItem('token')
    if (token === null)
        // -- user not authorized
        return callback(false, null)
    axios.patch(SERVER_URL).then(res => {
        console.log('authed')
        callback(true, res.data)
    }).catch(err => {
        console.log('not authed')
        callback(false, null)
    })
}
