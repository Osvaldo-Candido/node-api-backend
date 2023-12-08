const {Router} = require('express')
const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const notesRouter = Router()
const notescontroller = new NotesController


notesRouter.use(ensureAuthenticated)
notesRouter.post('/', notescontroller.create)
notesRouter.get('/', notescontroller.index)
notesRouter.get('/:id', notescontroller.show)
notesRouter.delete('/:id', notescontroller.delete)

module.exports = notesRouter