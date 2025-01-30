const mongoose = require('mongoose');
const validator = require('validator');

const moduleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            require: true,
        },
        iso: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        layout: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        cwdHP: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        pclHP: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        cwdHM: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        pclHM: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        setList: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        bom: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },
        calculation: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
                message: 'Неккоректный URL',
            },
        },   
    }
);

module.exports = mongoose.model('module', moduleSchema);