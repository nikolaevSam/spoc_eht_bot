const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
    const user = req.body.name;
    User.findOne({ name: user })
        .orFail(new NotFoundError(`Пользователь ${user} не подключен к EHT BOT!`))
        .then((user) => res.status(HTTP_STATUS_OK).send(user))
        .catch(next);
};

module.exports.getUsers = (req, res, next) => {
    User.find({})
        .then((users) => res.send(users))
        .catch(next);
};

module.exports.createUser = (req, res, next) => {
    const {
        name, type
    } = req.body;

    User.create({
        name, type
    })
        .then(() => res.status(HTTP_STATUS_CREATED).send({ message: `Пользователь ${name} добавлен!` }))
        .catch((err) => {
            if (err.code === 11000) {
                return next(new ConflictError(`Пользователь ${name} уже существует.`));
            }
            if (err.name === 'ValidationError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            } return next(err);
        });
};

module.exports.updateUser = (req, res, next) => {
    const { userId } = req.params;
    const {
        name, type
    } = req.body;

    User.findByIdAndUpdate(
        userId,
        {
            name: name,
            type: type
        },
        { new: true }
    )
        .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
        .then((sis) => res.send(sis))
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Данные пользователя обновлены!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            };
            return next(err);
        });
};

module.exports.deleteUser = (req, res, next) => {
    const {
        userId
    } = req.params;

    User.findById(userId)
        .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
        .then((user) => { return user.deleteOne() })
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Пользователь удален!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            };
            return next(err);
        });

};