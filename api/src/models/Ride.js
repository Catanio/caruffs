const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

// to resolve DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
// }


const RideSchema = new mongoose.Schema({
    idUffs: String,

    // geolocalization

    offering: Boolean,

    // i = going; v = coming Back -- (hour:minutes) 
    weekdays: {},

    location: {
        type: PointSchema,
        index: '2dsphere',
    }
})

module.exports = mongoose.model('Ride', RideSchema)