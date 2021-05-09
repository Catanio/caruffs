const { Router } = require('express');
const RideController = require('./controllers/RideController');
const ProfileController = require('./controllers/ProfileController');

const routes = Router();

routes.get('/ride', RideController.index);
routes.post('/ride', RideController.store);

// User
routes.post('/profile', ProfileController.store);
routes.get('/profile', ProfileController.login);
routes.post('/login', ProfileController.get);

module.exports = routes;