const { Router } = require('express');
const RideController = require('./controllers/RideController');
const { utils } = require('caruffs_shared');

const routes = Router();

routes.post('/ride', RideController.store)
routes.get('/near-rides', RideController.index)
utils.amqp.consume(process.env.PROPAGATE_USER_QUEUE, RideController.updateUser)

module.exports = routes;
