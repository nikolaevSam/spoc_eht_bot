const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        telergammName: {
            type: String,
            unique: true,
            require: true,
        },
        type: {
            type: String,
            default: 'user',
            require: true,
        },
    }
);

module.exports = mongoose.model('user', userSchema);