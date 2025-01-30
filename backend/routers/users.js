const usersRouter = require('express').Router();

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

usersRouter.get('/user', getUser);
usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.put('/:userId', updateUser);
usersRouter.delete('/:userId', deleteUser);

module.exports = usersRouter;