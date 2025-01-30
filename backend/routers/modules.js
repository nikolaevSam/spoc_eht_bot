const modulesRouter = require('express').Router();

const { 
    getModule,
    getModules,
    createModule,
    updateModule,
    deleteModule
} = require('../controllers/module');

modulesRouter.get('/', getModules)
modulesRouter.get('/module', getModule);
modulesRouter.post('/', createModule);
modulesRouter.put('/:moduleId', updateModule);
modulesRouter.delete('/:moduleId', deleteModule);

module.exports = modulesRouter;