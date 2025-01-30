const circuitsRouter = require('express').Router();

const {
    getCircuit,
    createCircuit,
    updateCircuit,
    deleteCircuit
} = require('../controllers/circuits');

circuitsRouter.get('/', getCircuit);
circuitsRouter.post('/', createCircuit);
circuitsRouter.put('/:circuitId', updateCircuit);
circuitsRouter.delete('/:circuitId', deleteCircuit);

module.exports = circuitsRouter; 