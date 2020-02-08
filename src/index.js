const { logError } = require('./features/error');
const { ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS } = require('./features/constants');

for (let index = 0; index < 20; index++) {
  logError({});
}

setTimeout(() => {
  for (let i = 0; i < 20; i++) {
    logError({});
  }
}, ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS);
