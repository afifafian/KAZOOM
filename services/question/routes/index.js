const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
const templateRoutes = require('./templateRouter');

router.get('/', (req, res) => {
    res.send("Let's play the game!")
})
router.use('/questions', questionRoutes)
router.use('/template', templateRoutes)

module.exports = router;