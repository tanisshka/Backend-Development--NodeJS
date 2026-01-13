const express = require('express');
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.set('query parser', 'extended');

app.use('/api/tours', tourRoute);
app.use('/api/users', userRoute);

module.exports=app;
