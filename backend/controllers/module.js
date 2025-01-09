const Module = require('../models/module');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getModule = (req, res, next) => {
    const moduleName = req.body.name
    Module.findOne({name: moduleName})
        .orFail(new NotFoundError('Module did not find!'))
        .then((module) => res.status(HTTP_STATUS_OK).send(module))
        .catch(next)
}