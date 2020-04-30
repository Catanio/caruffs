const { Router } = require('express')
const RideController = require('./controllers/RideController')
const ProfileController = require('./controllers/ProfileController')
const SearchRideController = require('./controllers/SearchRideController')

const routes = Router()

routes.get('/ride', RideController.index)
routes.post('/ride', RideController.store)

routes.post('/profile', ProfileController.store)

routes.get('/search', SearchRideController.index)

module.exports = routes