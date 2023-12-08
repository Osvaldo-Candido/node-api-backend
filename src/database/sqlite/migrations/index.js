const sqlConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrations()
{
    const schemas = [
        createUsers
    ].join('')

    sqlConnection().then(db => db.exec(schemas)).catch(error => console.error(error))
}

module.exports = migrations