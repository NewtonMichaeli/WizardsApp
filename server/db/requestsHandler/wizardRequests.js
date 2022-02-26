const con = require('../connection')
const {promisify} = require('util')
const mysql = require('mysql')

const asyncQuery = promisify(con.query.bind(con));

const createWizard = async (wizard, userId) => {
    const query = mysql.format(`INSERT INTO wizards (id, createdBy, filled, content, results) VALUES (NULL, ?, ?, ?, ?)`, [userId, 0, JSON.parse(wizard), JSON.parse([])])
    try {
        await asyncQuery(query)
        return true
    }
    catch {
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

    const query = mysql.format(`UPDATE wizards SET content = ?, WHERE wizards.id = ?`, [JSON.parse(newWizard), wizardId])
    try {
        await asyncQuery(query)
        return true
    }
    catch {
        return false
    }
}

const fillWizard = async (wizardId, filledWizard) => {

    const resultsQuery = mysql.format(`SELECT results FROM wizards WHERE id = ?`, [wizardId])
    try {
        const result = await asyncQuery(resultsQuery)

        const parsedResults = JSON.parse(result[0])
        const newResults = JSON.parse([...parsedResults, filledWizard])

        const updateQuery = mysql.format(`UPDATE wizards SET results = ?, WHERE wizards.id = ?`, [newResults, wizardId])
        try {
            const result = await asyncQuery(updateQuery)
            return true
        }
        catch {
            return false
        }
    }
    catch {
        return false
    }
}

const getWizard = async (wizardId) => {

    const query = mysql.format(`SELECT results FROM wizards WHERE id = ?`, [wizardId])
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

const getWizardsById = async (wizardId) => {
    const query = mysql.format(`SELECT * FROM wizards WHERE creator = ?`, [userId])
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

const getWizards = async () => {
    const query = `SELECT * FROM wizards`
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

module.exports = {getWizard, getWizards, getWizardsById, createWizard, deleteWizard, updateWizard, fillWizard}