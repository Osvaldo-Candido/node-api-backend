const {Router} = require('express')
const SessionController = require('../controllers/SessionController')
const sessioncontroller = new SessionController()

const routes = Router()


routes.post('/create',sessioncontroller.create)

module.exports = routes