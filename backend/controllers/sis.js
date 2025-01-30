const Sis = require('../models/sis');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getSis = (req, res, next) => {
    const sis = req.body.name;
    Sis.findOne({ name: sis })
        .orFail(new NotFoundError('SIS не найден!'))
        .then((sis) => res.status(HTTP_STATUS_OK).send(sis))
        .catch(next);
};

module.exports.getSises = (req, res, next) => {
    Sis.find({})
        .then((sises) => res.send(sises))
        .catch(next);
};

module.exports.createSis = (req, res, next) => {
    const {
        name, revision, description, status
    } = req.body;

    Sis.create({
        name, revision, description, status
    })
        .then(() => res.status(HTTP_STATUS_CREATED).send({ message: 'SIS добавлен!' }))
        .catch((err) => {
            if (err.code === 11000) {
                return next(new ConflictError(`SIS ${name} уже существует.`));
            }
            if (err.name === 'ValidationError') {
                return next(new BadRequestError('Переданы некорректные данные при создании греющей цепи.'));
            } return next(err);
        });
};

module.exports.updateSis = (res, req, next) => {
    const { sisId } = req.params;
    const {
        name, revision, description, status
    } = req.body;

    Sis.findByIdAndUpdate(
        sisId,
        {
            name: name,
            revision: revision,
            description: description,
            status: status
        },
        { new: true }
    )
        .orFail(new NotFoundError('SIS по указанному _id не найден.'))
        .then((sis) => res.send(sis))
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'SIS обновлен!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            };
            return next(err);
        });
};

module.exports.deleteSis = (req, res, next) => {
    const { sisId } = req.params;

    Sis.findById(sisId)
        .orFail(new NotFoundError('Sis не найден!'))
        .then((sis) => { return sis.deleteOne() })
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Sis удален!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            }
            return next(err);
        });
};