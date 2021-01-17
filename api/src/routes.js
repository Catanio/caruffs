const { Router } = require('express');
const RideController = require('./controllers/RideController');
const ProfileController = require('./controllers/ProfileController');

const routes = Router();

routes.get('/ride', RideController.index);
routes.post('/ride', RideController.store);

routes.post('/profile', ProfileController.store);

module.exports = routes;