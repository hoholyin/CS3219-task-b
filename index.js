// Import express
const express = require('express')
// Import Body Parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialise the app
const app = express()
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/taskb1', { useNewUrlParser: true });
const db = mongoose.connection;

if (!db) {
    console.log("Error in connecting db");
} else {
    console.log("Db connected successfully");
}

const port = process.env.PORT || 8080

// Import routes
const apiRoutes = require("./api-routes");
// Use Api routes in the App
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
