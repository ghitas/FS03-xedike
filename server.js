/** 3rd party package */
const express = require('express');
const mongoose = require('mongoose');

/** project package */
mongoose
  .connect('mongodb://localhost:27017/fs03-xedike', { useNewUrlParser: true })
  .then(console.log('connected to dadabase'))
  .catch(console.log);

/** initialize server */
const app = express();
const port = process.env.PORT || 5000; //env -> invironment
app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
