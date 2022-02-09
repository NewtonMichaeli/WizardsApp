const con = require('../connection')
const {promisify} = require('util')

const asyncQuery = promisify(con.query.bind(con));

const createUser = async (user) => {

    const {name, email, password, role} = user
    const query = `INSERT INTO users (id, name, email, password, role) VALUES (NULL, '${name}', '${email}', '${password}', '${role}')`
    try {
        const result = await asyncQuery(query)
        return true
    }
    catch {
        return false
    }
}

const deleteUser = async (id) => {

    const query = `DELETE FROM users WHERE id = ${id}`
    try {
        const result = await asyncQuery(query)
        return true
    }
    catch {
        return false
    }
}

const updateUser = async (newUser, id) => {

    const {name, email, password, role} = newUser
    const query = `UPDATE users SET name = '${name}', email = '${email}', password = '${password}', role = '${role}' WHERE users.id = ${id}`
    try {
        const result = await asyncQuery(query)
        return true
    }
    catch {
        return false
    }
}

const getUserByEmail = async (email) => {

    const query = `SELECT * FROM users WHERE email = '${email}'`
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

const getUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = ${id}`
    try {
        const result = await asyncQuery(query)
        return result[0]
    }
    catch {
        return false
    }
}

module.exports = {createUser, getUserById, deleteUser, updateUser, getUserByEmail}