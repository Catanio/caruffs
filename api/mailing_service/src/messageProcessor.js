const mailer = require('./libs/mailer')

module.exports = (message) => {
  const body = JSON.parse(message)
  switch (body.template) {
    case 'new_account': {
      mailer.sendConfirmationEmail(body.mail)
    }
    case 'forgot_password': {
      mailer.sendChangePasswordEmail(body.mail, body.id)
    }
  }
}