const circuitsRouter = require('express').Router();

const { getCircuit } = require('../controllers/circuits');

circuitsRouter.get('/', getCircuit);

module.exports = circuitsRouter; 