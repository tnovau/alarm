const Moment = require('moment');
const events = require('events');
const { store } = require('../store');
const notifyModule = require('../notify');
const { ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS } = require('../constants');

const ERROR_THROW_ERROR_MESSAGE = 'ERROR_THROW';
const errorThrowEventEmitter = new events.EventEmitter();

const ERROR_COUNT_LIMIT = 10;

/** @param {import('../../../types/error.for.handling').ErrorForHandling} param0 */
const errorThrowEventHanlder = async ({ date }) => {
  /** @param {import('moment').Moment} date */
  const handleAppNotNotifyingError = async date => {
    const errorsCount = store.getErrorsCountByDate(date);
    if (!(errorsCount > ERROR_COUNT_LIMIT)) return;

    store.setAppIsNotifying();
    await notifyModule.notifyViaEmail();

    setTimeout(() => {
      store.setAppIsNotNotifying();
      handleAppNotNotifyingError(Moment().utc());
    }, ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS);
  };

  store.addErrorDate(date);
  if (store.getAppNotifying()) return;

  await handleAppNotNotifyingError(date);
};

errorThrowEventEmitter.on(ERROR_THROW_ERROR_MESSAGE, errorThrowEventHanlder);

module.exports = {
  ERROR_THROW_ERROR_MESSAGE,
  errorThrowEventEmitter,
};
