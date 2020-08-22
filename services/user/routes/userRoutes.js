const router = require('express').Router()
const UserController = require('../controllers/UserController');

router.get('/leaderboards', UserController.getAll)
router.post('/register', UserController.register)
    // router.post('/login', UsersController.login)

module.exports = router;