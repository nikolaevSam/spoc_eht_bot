require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const router = require('./routers/router');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect('mongodb://localhost:27017/ehtdb');

app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});

app.use(requestLogger);
app.use(helmet());
app.use('/', router);
app.use(errorLogger);

app.use(errors({ message: 'Ошибка валидации Joi!' }));

app.use((error, req, res, next) => {
    const {
        status = HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message,
    } = error;
    res.status(status).send({
        message: status === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
    });
    next();
});
app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});