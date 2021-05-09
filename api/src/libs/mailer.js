"use strict";
const nodemailer = require("nodemailer");

const sendEmail = ({ receivers, subject, textBody, htmlTemplate }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: `"CarUFFS" <${process.env.EMAIL_ACCOUNT}>`,
    to: receivers,
    subject: subject,
    text: textBody,
    html: htmlTemplate
  });
}

const sendConfirmationEmail = async (email) => {
  const link = process.env.API_ADDRESS + '/confirm?email=' + email
  const template = fs.readFileSync(filePath).toString().replace('{{CONFIRMATION_URL}}', link).replace('{{API_ADDRESS}}', process.env.API_ADDRESS)
  await sendEmail({
    receivers: email,
    subject: 'Obrigado por ter se cadastrado no CarUFFS',
    textBody: `Obrigado pelo seu cadastro no CarUFFS, clique no link: ${link}, para confirmar seu email e finalziar seu cadastro`,
    htmlTemplate: template
  });
}

module.exports = {
  sendConfirmationEmail
}
