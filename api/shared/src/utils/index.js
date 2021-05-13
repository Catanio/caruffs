const authenticate = require('./authenticate')
const amqp = require('./amqp')

const redactedProfile = () => {
  return {
    idUffs: "redacted",
    name: "redacted",
    bio: "redacted",
    phone: "redacted",
    mail: "redacted",
    vehicle:{
      seats: 0,
      color: "redacted",
      brand: "redacted",
      model: "redacted"
    }
  }
}

module.exports = {
  authenticate,
  amqp,
  redactedProfile
}