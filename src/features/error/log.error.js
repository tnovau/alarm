const Moment = require('moment');
const { ERROR_THROW_ERROR_MESSAGE, errorThrowEventEmitter } = require('./error.throw.event');

const logError = error => {
  // Do whatever error handling you need here.
  errorThrowEventEmitter.emit(ERROR_THROW_ERROR_MESSAGE, { error, date: Moment().utc() })
};

module.exports = {
  logError,
};
