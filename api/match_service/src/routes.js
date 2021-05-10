const { Router } = require('express');
const MatchController = require('./controllers/MatchController');

const routes = Router();

routes.post('/match', MatchController.join)
routes.get('/match', MatchController.index)

module.exports = routes;
