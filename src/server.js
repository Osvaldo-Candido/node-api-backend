require('express-async-errors')
const uploadConfig = require('./configs/upload')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const migration = require('./database/sqlite/migrations') 
const AppError = require('./utils/AppError')

const app = express()
app.use(cors())
const PORT = 3000

app.use(express.json())
app.use(routes)
app.use("/files",express.static(uploadConfig.UPLOAD_FOLDERS))
app.get('/',(require, response) => {
        response.send('Carregando de boa')
})

migration()

app.use((error, request, response, next) => {
        
        if(error instanceof AppError)
        {
                return response.status(error.statusCode).json({
                        status: 'error',
                        message: error.message
                })
        }
        console.error(error)
        return response.status(500).json({
                status: 'status',
                message: 'error internal server'
        })
})
app.listen(PORT, ()=> console.log(`Aplicação inicializada ${PORT}`))