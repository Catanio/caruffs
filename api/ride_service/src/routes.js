const { Router } = require('express');
const RideController = require('./controllers/RideController');

const routes = Router();

routes.post('/ride', RideController.store)
routes.get('/near-rides', RideController.index)

module.exports = routes;
