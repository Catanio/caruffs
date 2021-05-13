const { Router } = require('express');
const ProfileController = require('./controllers/ProfileController');

const routes = Router();

// User auth
routes.put('/profile', ProfileController.update)
routes.get('/profile', ProfileController.get)
routes.delete('/profile', ProfileController.destroyProfile)
routes.get('/refresh-token', ProfileController.recycleToken)

// User public
routes.post('/create', ProfileController.store)
routes.post('/login', ProfileController.login)
routes.get('/confirm', ProfileController.confirmEmail)
routes.post('/request-change-password', ProfileController.requestChangePassword)
routes.post('/change-password', ProfileController.changePassword)

module.exports = routes;
