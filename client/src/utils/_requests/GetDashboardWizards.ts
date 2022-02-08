// Get all wizards from server

import axios from 'axios'
import { WizardsFormat } from '../../interfaces/WizardFormat'

const SERVER_URL = 'http://localhost:5000/'

// Callback function params
export type GetAllWizards_callback_props = {
    (status: boolean, data: WizardsFormat | null): void
}

// Tries to get all data & wizards from the server
export default (callback: GetAllWizards_callback_props) =>
{
    const token = window.localStorage.getItem('token')
    if (token === null)
        // -- user not authorized
        return callback(false, null)
    axios.get(SERVER_URL).then(res => {
        console.log('authed')
        callback(true, res.data)
    }).catch(err => {
        console.log('not authed')
        callback(false, null)
    })
}
