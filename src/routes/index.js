const {Router} = require('express')
const userRouter = require('./route.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes') 
const sessionRouter = require('./session.routes')

const routes = Router()

routes.use('/users',userRouter)
routes.use('/notes',notesRouter)
routes.use('/tags', tagsRouter)
routes.use('/session',sessionRouter)


module.exports = routes