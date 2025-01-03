const mongoose = require('mongoose');
const validator = require('validator');

const circuitSchema = new mongoose.Schema(
    {
        circuit: {
            type: String,
            unique: true,
            require: true,
        },
        module: {
            type: String,
            require: true,
        },     
        deck: {
            type: String,
            require: true,
        },
        MB: {
            type: String,
            require: true,
        },
        MB_MSP: {
            type: String,
            require: true,
        },
        TA: {
            type: String,
            require: true,
        },
        TA_MSP: {
            type: String,
            require: true,
        },
        RTD01: {
            type: String,
            require: true,
        },
        RTD02: {
            type: String,
            require: true,
        },
        JB: {
            type: String,
            require: true,
        },
        ehtCable: {
            type: String,
            require: true,
        },
        iso: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isEmail(url),
                message: 'Неккоректный URL',
            },
        },
        cwd: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isEmail(url),
                message: 'Неккоректный URL',
            },
        },
        layout: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isEmail(url),
                message: 'Неккоректный URL',
            },
        },
        pcl: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isEmail(url),
                message: 'Неккоректный URL',
            },
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'user',
        },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model('circuit', circuitSchema);