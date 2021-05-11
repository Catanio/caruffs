const mailer = require('./libs/mailer')

module.exports = (message) => {
  const body = JSON.parse(message)
  if (body.template === 'new_account') {
    mailer.sendConfirmationEmail(body.mail)
  } else {
    mailer.sendChangePasswordEmail(body.mail, body.id)
  }
}