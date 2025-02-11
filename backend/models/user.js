const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            require: true,
        },
        type: {
            type: String,
            default: 'user',
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model('user', userSchema);