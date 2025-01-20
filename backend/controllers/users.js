const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
    const user = req.body.name;
    User.findOne({name: user})
        .orFail(new NotFoundError('User is not in EHT BOT!'))
        .then((user) => res.status(HTTP_STATUS_OK).send(user))
        .catch(next);
}