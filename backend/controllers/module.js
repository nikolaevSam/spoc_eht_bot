const Module = require('../models/module');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getModule = (req, res, next) => {
    const { moduleName } = req.params;
    Module.findOne(moduleName)
        .orFail(new NotFoundError('Module did not find!'))
        .then((module) => res.status(HTTP_STATUS_OK).send(module))
        .catch(next);
}