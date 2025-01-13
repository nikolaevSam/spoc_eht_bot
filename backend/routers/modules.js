const moduleRouter = require('express').Router();

const { getModule, getModules } = require('../controllers/module');

moduleRouter.get('/', getModules)
moduleRouter.get('/module', getModule);

module.exports = moduleRouter;