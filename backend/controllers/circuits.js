const Circuit = require('../models/circuit');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getCircuit = (req, res, next) => {
    const circuitTag = req.body.name;
    Circuit.findOne(circuitTag)
        .orFail(new NotFoundError('Circuit did not find!'))
        .then((circuit) => res.status(HTTP_STATUS_OK).send(circuit))
        .catch(next);
}