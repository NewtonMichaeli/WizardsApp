const {DB_HOST, DB_USER, DB_PASS, DB_NAME} = process.env
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASS}`,
    database: `${DB_NAME}`
})

connection.connect((err) => {
    if(err) throw new Error(err)
    console.info('DB connected successfuly.')
})

module.exports = connection