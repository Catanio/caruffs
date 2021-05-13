const { utils } = require('caruffs_shared');
const { Router } = require('express');
const MatchController = require('./controllers/MatchController');

const routes = Router();

routes.post('/match', MatchController.join)
routes.get('/match', MatchController.index)

utils.amqp.consume(process.env.PROPAGATE_USER_QUEUE, MatchController.updateUser)

module.exports = routes;
