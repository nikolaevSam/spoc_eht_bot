const sisesRouter = require('express').Router();

const { getSis, getSises } = require('../controllers/sis');

sisesRouter.get('/', getSises);
sisesRouter.get('/sis', getSis);

module.exports = sisesRouter;