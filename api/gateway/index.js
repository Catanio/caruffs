const cors = require('cors');
const express = require ('express');
const routes = require('./src/routes');
const app = express();

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(routes);
app.use('/public', express.static(__dirname + "/static"));
app.use('/photos', express.static(__dirname + "/photos"));

app.listen(3000);