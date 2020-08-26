const routes = require('express').Router();
const TemplateController = require('../controllers/TemplateController');

routes.get('/', TemplateController.getAll)
routes.post('/', TemplateController.addTemplate)
routes.delete('/:id', TemplateController.deleteTemplate)

module.exports = routes;