const Circuit = require('../models/circuit');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getCircuit = (req, res, next) => {
    const circuitTag = req.body.circuit;

    Circuit.findOne({ circuit: circuitTag })
        .orFail(new NotFoundError('Цепь не найдена!'))
        .then((circuit) => res.status(HTTP_STATUS_OK).send(circuit))
        .catch(next);
};

module.exports.createCircuit = (req, res, next) => {
    const {
        circuit,
        module,
        deck,
        mb,
        mbmsp,
        ta,
        tamsp,
        rtd01,
        rtd02,
        jb,
        ehtcable,
        iso,
        cwd,
        layout,
        pcl
    } = req.body;

    Circuit.create({
        circuit,
        module,
        deck,
        mb,
        mbmsp,
        ta,
        tamsp,
        rtd01,
        rtd02,
        jb,
        ehtcable,
        iso,
        cwd,
        layout,
        pcl
    })
        .then(() => res.status(HTTP_STATUS_CREATED).send({ message: 'Цепь добавлена!' }))
        .catch((err) => {
            if (err.code === 11000) {
                return next(new ConflictError(`Греющая цепь ${circuit} уже существует.`));
            }
            if (err.name === 'ValidationError') {
                return next(new BadRequestError('Переданы некорректные данные при создании греющей цепи.'));
            } return next(err);
        });
};

module.exports.updateCircuit = (req, res, next) => {
    const { circuitId } = req.params;
    const {
        circuit,
        module,
        deck,
        mb,
        mbmsp,
        ta,
        tamsp,
        rtd01,
        rtd02,
        jb,
        ehtcable,
        iso,
        cwd,
        layout,
        pcl
    } = req.body;

    Circuit.findByIdAndUpdate(
        circuitId,
        {
            circuit: circuit,
            module: module,
            deck: deck,
            mb: mb,
            mbmsp: mbmsp,
            ta: ta,
            tamsp: tamsp,
            rtd01: rtd01,
            rtd02: rtd02,
            jb: jb,
            ehtcable: ehtcable,
            iso: iso,
            cwd: cwd,
            layout: layout,
            pcl: pcl
        },
        { new: true },)
        .orFail(new NotFoundError('Цепь по указанному _id не найдена.'))
        .then((circuit) => res.send(circuit))
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Цепь обновленна!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            };
            return next(err);
        });
};

module.exports.deleteCircuit = (req, res, next) => {
    const { circuitId } = req.params;

    Circuit.findById(circuitId)
        .orFail(new NotFoundError('Цепь не найдена!'))
        .then((circuit) => { return circuit.deleteOne() })
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Цепь удалена!' }))
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError('Переданы некорректные данные.'));
            }
            return next(err);
        });
};