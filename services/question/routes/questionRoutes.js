const routes = require('express').Router();
const QuestionController = require('../controllers/QuestionController');

routes.get('/', QuestionController.getAll)
routes.post('/', QuestionController.addQuestion)

module.exports = routes;