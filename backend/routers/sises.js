const sisesRouter = require('express').Router();

const {
    getSis,
    getSises,
    createSis,
    updateSis,
    deleteSis
} = require('../controllers/sis');

sisesRouter.get('/', getSises);
sisesRouter.get('/sis', getSis);
sisesRouter.post('/', createSis);
sisesRouter.put('/:sisId', updateSis);
sisesRouter.delete('/:sisId', deleteSis);


module.exports = sisesRouter;