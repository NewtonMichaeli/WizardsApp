
export const createUser = async (user) => {

    const {name, email, password, role} = user
    let error = false
    const query = `INSERT INTO 'users' ('name', 'email', 'password', 'role') VALUES ('${name}', '${email}', '${password}', '${role}')`

    await con.query(query, (err) => {if (err) return error = true})

    if(error) return false
    return true
}

export const deleteUser = async (id) => {

    let error = false
    const query = `DELETE FROM 'users' WHERE id = ${id}`

    await con.query(query, (err) => {if (err) return error = true})

    if(error) return false
    return true
}

export const updateUser = async (newUser, id) => {

    const {name, email, password, role} = newUser
    let error = false
    const query = `UPDATE 'users' SET 'name' = '${name}', 'email' = '${email}', 'password' = '${password}', 'role' = '${role}' WHERE 'users'.'id' = ${id}`

    await con.query(query, (err) => {if (err) return error = true})

    if(error) return false
    return true
}

export const getUser = async (id) => {

    let error = false
    let res = undefined
    const query = `UPDATE 'users' SET 'name' = '${name}', 'email' = '${email}', 'password' = '${password}', 'role' = '${role}' WHERE 'users'.'id' = ${id}`

    await con.query(query, (err, result) => {if (err) return error = true; else res = result})

    if(error) return false
    return res
}