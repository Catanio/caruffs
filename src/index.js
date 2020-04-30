// routing and HTMLmethods
const express = require ('express')
// noSQL db management
const mongoose = require('mongoose')
// routing
const routes = require('./routes')

const app = express()

// this allows express to use Json
app.use(express.json())
// it needs to come first then use.routes in order to routes use it.
app.use(routes)


// connects to mongodb
// ( ! ) remember to replace "test" for the DB name on the string bellow
mongoose.connect(/* String to connect to the database*/, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



app.listen(9090)