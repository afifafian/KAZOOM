const router = require('express').Router()
const UsersController = require('../controllers/UserControllers')

router.get('/', UsersController.get)
router.post('/register', UsersController.register)
    // router.post('/login', UsersController.login)

module.exports = router;