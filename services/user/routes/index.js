const router = require('express').Router()
const user = require('./userRoutes')
    // const kazoom = require('./kazoomRoutes')

router.use('/users', user)
    // router.use('/kazooms', kazoom)

router.get('/', (req, res) => {
    res.send("welcome, /users")
})

module.exports = router