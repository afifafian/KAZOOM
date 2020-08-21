const router = require('express').Router()
const UsersController = require('../controllers/UserController');

router.get('/leaderboards', UsersController.getAll)
router.post('/register', UsersController.register)
    // router.post('/login', UsersController.login)

module.exports = router;