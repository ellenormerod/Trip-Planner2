const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('../routes');
const db = require('../models').db;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is listening.')
  db.sync()
  .then(() => {
    console.log('DB is Synced.')
  })
  .catch(err => {
    console.error('There\'s been an error:', err, err.stack);
  })
})
