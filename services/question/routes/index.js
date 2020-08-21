const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
    // const kazoom = require('./kazoomRoutes')

router.get('/', (req, res) => {
    res.send("Let's make a Question")
})
router.use('/questions', questionRoutes)
    // router.use('/kazooms', kazoom)

module.exports = router;