// Import express
const express = require('express')
// Import Body Parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');

const cors = require('cors');

// Initialise the app
const app = express()
app.options('*', cors());

require('dotenv').config()
const connect = require('./database');
connect();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080

// Import routes
const apiRoutes = require("./api-routes");
// Use Api routes in the App
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Contact app listening at port ${port}`)
})

module.exports = app;
