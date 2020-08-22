const routes = require('express').Router();
const QuestionController = require('../controllers/QuestionController');

routes.get('/', QuestionController.getAll)
routes.post('/', QuestionController.addQuestion)
routes.delete('/', QuestionController.deleteMany)
routes.delete('/:id', QuestionController.deleteQuestion)

module.exports = routes;