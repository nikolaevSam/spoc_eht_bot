const httpConstants = require('http2').constants;

const {
    HTTP_STATUS_CREATED,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_OK,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_FORBIDDEN,
    HTTP_STATUS_CONFLICT,
} = httpConstants;
const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const idRegex = /^[0-9a-fA-F]{24}$/;
module.exports = {
    HTTP_STATUS_CREATED,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_OK,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_FORBIDDEN,
    HTTP_STATUS_CONFLICT,
    linkRegex,
    idRegex,
};
