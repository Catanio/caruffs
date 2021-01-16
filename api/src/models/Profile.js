const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const ProfileSchema = new mongoose.Schema({
    idUffs: String,
    name: String,
    bio: String,
    contact: String,
})

module.exports = mongoose.model('Profile', ProfileSchema)