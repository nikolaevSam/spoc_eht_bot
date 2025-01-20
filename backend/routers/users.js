const usersRouter = require('express').Router();

const { getUser } = require('../controllers/users');

usersRouter.get('/', getUser);

module.exports = usersRouter;