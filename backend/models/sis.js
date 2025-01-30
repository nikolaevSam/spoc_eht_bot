const mongoose = require('mongoose');

const sisScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            require: true,
        },
        revision: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        status: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model('sises', sisScheme);