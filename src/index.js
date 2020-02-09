const express = require('express');
const Moment = require('moment');
const { logError } = require('./features/error');
const { store } = require('./features/store');

const app = express();

app.get('/', (_, res) => {
  try {
    const a = null;
    a.f();
  } catch (error) {
    logError(error);
  }
  return res.status(200).json({
    appNotifying: store.getAppNotifying(),
    errorCount: store.getErrorsCountByDate(Moment().utc()),
  });
});

const DEFAULT_PORT = 3000;

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
