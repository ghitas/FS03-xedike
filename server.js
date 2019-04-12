/** 3rd party package */
const express = require('express');

/** project package */

/** initialize server */
const app = express();
const port = process.env.PORT || 5000; //env -> invironment
app.listen(port, () => {
  console.log('Connect to DB on ' + port);
});
