const modulesRouter = require('express').Router();

const { getModule } = require('../controllers/module');

modulesRouter.get('/', getModule);

module.exports = modulesRouter;