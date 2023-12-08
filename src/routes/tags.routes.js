const {Router} = require('express')
const TagsController = require('../controllers/TagsController')
const tagsRouter = Router()
const tagscontroller = new TagsController
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


tagsRouter.get('/', ensureAuthenticated, tagscontroller.index)

module.exports = tagsRouter