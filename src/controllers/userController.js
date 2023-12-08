const {Router} = require('express')
const {hash, compare} = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqlConnection = require('../database/sqlite')
const routes = Router()
const creatUsers = require('../database/sqlite/migrations/createUsers')

class userController {
    
    async create(request, response)
    {
       const {name, email, password} = request.body

       const database = await sqlConnection()
       const checkUserEmail = await database.get('SELECT * FROM users WHERE email = (?)',[email])
       const hashPassword = await hash(password, 8)
       if(checkUserEmail)
       {
            throw new AppError('Este email já está a ser usado')
       }
       await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)",[name, email, hashPassword])
       response.status(201).json()
    }

    async update(request, response)
    {
        const {name, email, password, old_password} = request.body
        const user_id = request.user.id

        const database = await sqlConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)",[user_id])

        if(!user)
        {
            
            throw new AppError('Este usuário não existe')
        }

        const checkedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkedEmail && checkedEmail.id !== user.id)
        {
            throw new AppError('Este email já existe')
        }
       
        if(password && !old_password)
        {
            throw new AppError('Precisa informar tanto a senha antiga como a nova')
        }

        if(password && old_password)
        {
            const checkedPassword = await compare(old_password, user.password)

            if(!checkedPassword)
            {
                throw new AppError('A Senha antiga não confere')
            }

            user.password = await hash(password, 8)
        }
        user.name = name ?? user.name
        user.email = email ?? user.email

        await database.run("UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?",[user.name, user.email, user.password, new Date(), user_id])

        return response.json({messagem: 'Actualizado com sucesso'})

    }

}

module.exports = userController 