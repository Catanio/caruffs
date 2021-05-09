const { Router } = require('express');
const RideController = require('./controllers/RideController');
const ProfileController = require('./controllers/ProfileController');
const { isAuthorized } = require('./libs/authorization')

const routes = Router();

routes.get('/ride', RideController.index)
routes.post('/ride', RideController.store)

// User
routes.put('/profile', isAuthorized, ProfileController.update)
routes.get('/profile', isAuthorized, ProfileController.get)
routes.post('/profile', ProfileController.store)
routes.post('/login', ProfileController.login)
routes.get('/confirm', ProfileController.confirmEmail)

module.exports = routes;
