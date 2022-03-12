const con = require('../connection')
const {promisify} = require('util')
const mysql = require('mysql')

const asyncQuery = promisify(con.query.bind(con));

const createWizard = async (wizard, userId) => {
    // Initial wizard with initial properties
    const initWizard = {
        ...wizard,
        DoC: new Date().getDate(),  // -- date of creation - constant
        canNavigate: false          // -- default is false
    }
    try {
        // Insert new initial wizard
        const query = mysql.format(`INSERT INTO wizards (id, createdBy, filled, content, results) VALUES (NULL, ?, ?, ?, ?)`, [userId, 0, JSON.stringify(initWizard), JSON.stringify([])])
        const qResult = await asyncQuery(query)
        // Update wizard id inside json content
        const setIdInsideJson = mysql.format(`UPDATE wizards SET content = ? WHERE wizards.id = ?`, [
            JSON.stringify({
                ...initWizard,
                id: qResult.insertId
            }), qResult.insertId
        ])
        const updateWizardIdInJson_res = await asyncQuery(setIdInsideJson)
        // Get wizard id
        const getUserQuery = mysql.format(`SELECT * FROM wizards WHERE id=?`, [qResult.insertId])
        const result = await asyncQuery(getUserQuery)
        return result[0]
    }
    catch(err) {
        return false
    }
}

const deleteWizard = async (wizardId) => {
    const query = mysql.format(`DELETE FROM wizards WHERE id = ?`, [wizardId])

    try {
        await asyncQuery(query)
        return true
    }
    catch {
        return false
    }
}

const updateWizard = async (wizardId, newWizard) => {

    const query = mysql.format(`UPDATE wizards SET content = ? WHERE wizards.id = ?`, [JSON.stringify(newWizard), wizardId])
    try {
        const {insertID} = await asyncQuery(query)
        const getUserQuery = mysql.format(`SELECT * FROM wizards WHERE id=?`, [insertID])
        const result = await asyncQuery(getUserQuery)
        // console.log(result);
        return true
        // return result[0]
    }
    catch(err) {
        console.log(err)
        return false
    }
}

const fillWizard = async (wizardId, filledWizard) => {

    const resultsQuery = mysql.format(`SELECT results FROM wizards WHERE id = ?`, [wizardId])
    try {
        const result = await asyncQuery(resultsQuery)
        console.log('result: ')
        console.log(result)
        const parsedResults = JSON.parse(result[0].results)
        // Check if user has already answerd
        parsedResults.map(res => {
            if (res.email === filledWizard.email && res.name === filledWizard.name)
                // -- user has already answerd
                throw new Error("User has already answerd")
        })
        // Send query to db
        const newResults = JSON.stringify([...parsedResults, filledWizard])
        const updateQuery = mysql.format(`UPDATE wizards SET results = ? WHERE wizards.id = ?`, [newResults, wizardId])
        await asyncQuery(updateQuery)
        return true
    }
    catch (err) {
        console.log(err.message ?? err.data)
        return false
    }
}

const getWizard = async (wizardId) => {

    // const query = mysql.format(`SELECT results FROM wizards WHERE id = ?`, [wizardId])
    const query = mysql.format(`SELECT * FROM wizards WHERE id = ?`, [wizardId])
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

const getWizardsById = async (userId) => {
    const query = mysql.format(`SELECT * FROM wizards WHERE createdBy = ?`, [userId])
    try {
        const result = await asyncQuery(query)
        return result
    }
    catch {
        return false
    }
}

const getWizards = async () => {
    const query = `SELECT * FROM wizards`
    try {
        const result = await asyncQuery(query)
        return result
    }
    catch {
        return false
    }
}

module.exports = {getWizard, getWizards, getWizardsById, createWizard, deleteWizard, updateWizard, fillWizard}