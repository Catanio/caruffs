const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require ('express');
const routes = require('./src/routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/public', express.static(__dirname + "/static"));

app.listen(process.env.PORT);