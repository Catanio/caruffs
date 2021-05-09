const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require ('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/public', express.static(__dirname + "/static"));

app.listen(process.env.PORT);