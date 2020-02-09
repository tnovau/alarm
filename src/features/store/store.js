const { ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS } = require('../constants');

const store = (() => {
  /** @type {Array<import('moment').Moment>} */
  let errors = [];
  let appNotifying = false;

  /** @param {import('moment').Moment} errorDate */
  const addErrorDate = errorDate => {
    errors = errors.concat([errorDate]);
  };

  /** @param {import('moment').Moment} date */
  const getDateInmutableWithSubstractedHandlerTimeout = date => {
    const dateOneMinuteBefore = date.clone();
    return dateOneMinuteBefore.subtract({
      milliseconds: ERROR_HANDLER_TIMEOUT_CALL_MILLISECONDS,
    });
  }

  /** @param {import('moment').Moment} actualDate */
  const getErrorsCountByDate = actualDate => {
    const actualDateOneMinuteBefore = getDateInmutableWithSubstractedHandlerTimeout(actualDate);
    return errors.filter(x => x.isSameOrAfter(actualDateOneMinuteBefore)).length;
  };

  const setAppIsNotifying = () => {
    appNotifying = true;
  };

  const setAppIsNotNotifying = () => {
    appNotifying = false;
  };

  const getAppNotifying = () => appNotifying;

  return {
    addErrorDate,
    getErrorsCountByDate,
    setAppIsNotifying,
    setAppIsNotNotifying,
    getAppNotifying,
  };
})();

module.exports = {
  store
};
