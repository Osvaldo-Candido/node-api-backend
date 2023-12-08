const {Router} = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')
const userController = require('../controllers/userController')
const UserAvatarController = require('../controllers/UserAvatarController')
const routeUser = Router()
const usercontroller = new userController
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const upload = multer(uploadConfig.MULTER)

/*function middllewareUsers(require, response, next)
{
    if(!require.body.isAdmin)
    {
        response.json({message: 'User unauthorized'})
    }

    next()
}*/
const userAvatarController = new UserAvatarController()

routeUser.post('/create', usercontroller.create)
routeUser.put('/update',ensureAuthenticated,usercontroller.update)
routeUser.patch('/avatar',ensureAuthenticated,upload.single("avatar"), userAvatarController.update)

module.exports = routeUser
