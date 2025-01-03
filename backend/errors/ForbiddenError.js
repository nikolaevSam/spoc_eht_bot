const { HTTP_STATUS_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
