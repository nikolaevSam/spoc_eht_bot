const Module = require('../models/module');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getModule = (req, res, next) => {
    const module = req.body.name;

    Module.findOne({ name: module })
        .orFail(new NotFoundError(`Модуль ${module} не найден!`))
        .then((module) => res.status(HTTP_STATUS_OK).send(module))
        .catch(next);
};

module.exports.getModules = (req, res, next) => {
    Module.find({})
        .then((modules) => res.send(modules))
        .catch(next);
};

module.exports.createModule = (req, res, next) => {
    const {
        name,
        bom,
        calculation,
        cwdHM,
        cwdHP,
        iso,
        layout,
        pclHM,
        pclHP,
        setList
    } = req.body;

    Module.create({
        name,
        bom,
        calculation,
        cwdHM,
        cwdHP,
        iso,
        layout,
        pclHM,
        pclHP,
        setList
    })
        .then(() => res.status(HTTP_STATUS_CREATED).send({ message: `Модуль ${name} добавлен!` }))
        .catch((err) => {
            if (err.code === 11000) {
                return next(new ConflictError(`Модуль ${name} уже существует.`));
            }
            if (err.name === 'ValidationError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            } return next(err);
        });
};

module.exports.updateModule = (req, res, next) => {
    const { moduleId } = req.params;
    const {
        name,
        bom,
        calculation,
        cwdHM,
        cwdHP,
        iso,
        layout,
        pclHM,
        pclHP,
        setList
    } = req.body;

    Module.findByIdAndUpdate(
        moduleId,
        {
            name: name,
            bom: bom,
            calculation: calculation,
            cwdHM: cwdHM,
            cwdHP: cwdHP,
            iso: iso,
            layout: layout,
            pclHM: pclHM,
            pclHP: pclHP,
            setList: setList
        },
        { new: true }
    )
    .orFail(new NotFoundError('Модуль по указанному _id не найдена.'))
    .then((module) => res.send(module))
    .then(() => res.status(HTTP_STATUS_OK).send({ message: `Модуль ${name} обновлен!` }))
    .catch((err) => {
        if (err.name === 'CastError') {
            return next(new BadRequestError('Переданы некорректные данные.'));
        };
        return next(err);
    });
};

module.exports.deleteModule = (req, res, next) => {
    const { moduleId } = req.params;

    Module.findById(moduleId)
        .orFail(new NotFoundError('Модуль по указанному _id не найдена.'))
        .then((module) => { return module.deleteOne() })
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Модуль удален!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            }
            return next(err);
        });
};