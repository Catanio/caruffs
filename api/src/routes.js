const { Router } = require('express');
const RideController = require('./controllers/RideController');
const ProfileController = require('./controllers/ProfileController');
const { isAuthorized } = require('./libs/authorization')

const routes = Router();

// Ride auth
routes.post('/ride', isAuthorized, RideController.store)

// Ride public
routes.get('/ride', RideController.index)


// User auth
routes.put('/profile', isAuthorized, ProfileController.update)
routes.get('/profile', isAuthorized, ProfileController.get)
routes.post('/refresh-token', isAuthorized, ProfileController.recycleToken)

// User public
routes.post('/profile', ProfileController.store)
routes.post('/login', ProfileController.login)
routes.get('/confirm', ProfileController.confirmEmail)

module.exports = routes;
