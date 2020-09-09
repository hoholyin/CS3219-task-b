const mongoose = require('mongoose');
const localConnection = "mongodb://localhost/cs3219-task-b1"
const connection = "mongodb+srv://holyin:cs3219-task-b1@cluster0.luoag.mongodb.net/<dbname>?retryWrites=true&w=majority"

function connect() {
    const isLocal = process.env.USER ? process.env.USER.includes('hoholyin') : false;
    const uri = isLocal ? localConnection : connection;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log("Database Connected Successfully"))
        .catch(err => console.log(err));
}

module.exports = connect
