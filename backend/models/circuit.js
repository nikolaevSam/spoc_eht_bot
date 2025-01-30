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
        mb: {
            type: String,
            require: true,
        },
        mbmsp: {
            type: String,
            require: true,
        },
        ta: {
            type: String,
            require: true,
        },
        tamsp: {
            type: String,
            require: true,
        },
        rtd01: {
            type: String,
            require: true,
        },
        rtd02: {
            type: String,
            require: true,
        },
        jb: {
            type: String,
            require: true,
        },
        ehtcable: {
            type: String,
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
        cwd: {
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
        pcl: {
            type: String,
            default: 'https://drive.ctr-hub.com/s/xGmZorFFCBpW3Nm',
            require: true,
            validate: {
                validator: (url) => validator.isURL(url),
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