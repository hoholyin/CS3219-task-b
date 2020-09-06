const mongoose = require('mongoose');
const connection = "mongodb+srv://holyin:cs3219-task-b1@cluster0.luoag.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
