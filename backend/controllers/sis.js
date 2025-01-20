const Sis = require('../models/sis');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getSis = (req, res, next) => {
    const sis = req.body.name;
    Sis.findOne({name: sis})
        .orFail(new NotFoundError('Sis did not find!'))
        .then((sis) => res.status(HTTP_STATUS_OK).send(sis))
        .catch(next);
};

module.exports.getSises = (req, res, next) => {
    Sis.find({})
        .then((sises) => res.send(sises))
        .catch(next);
};