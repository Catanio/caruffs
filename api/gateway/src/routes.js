const { Router } = require('express');
const ProfileController = require('./controllers/ProfileController');
const RideController = require('./controllers/RideController');
const MatchController = require('./controllers/MatchController');
const { utils } = require('caruffs_shared')

const routes = Router();

// Ride auth
routes.post('/ride', utils.authenticate.isAuthorized, RideController.store)
routes.get('/near-rides', utils.authenticate.isAuthorized, RideController.index)

// Match auth
routes.post('/match', utils.authenticate.isAuthorized, MatchController.join)
routes.get('/match', utils.authenticate.isAuthorized, MatchController.index)

// User auth
routes.put('/profile', utils.authenticate.isAuthorized, ProfileController.update)
routes.get('/profile', utils.authenticate.isAuthorized, ProfileController.get)
routes.delete('/profile', utils.authenticate.isAuthorized, ProfileController.destroyProfile)
routes.get('/refresh-token', utils.authenticate.isAuthorized, ProfileController.recycleToken)

// User public
routes.post('/profile', ProfileController.store)
routes.post('/login', ProfileController.login)
routes.get('/confirm', ProfileController.confirmEmail)
routes.post('/request-change-password', ProfileController.requestChangePassword)
routes.post('/change-password', ProfileController.changePassword)

module.exports = routes;
