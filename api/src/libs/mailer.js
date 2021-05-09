"use strict";
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path');

const sendEmail = ({ receivers, subject, textBody, htmlTemplate }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
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

const sendConfirmationEmail = async (mail) => {
  const token = jwt.sign({ mail }, process.env.SECRET);
  const link = process.env.API_ADDRESS + '/confirm?token=' + token
  const template = fs.readFileSync(path.join(process.cwd(), '/src/templates/confirmation_email.html')).toString().replace('{{CONFIRMATION_URL}}', link).replace('{{API_ADDRESS}}', process.env.API_ADDRESS)
  await sendEmail({
    receivers: mail,
    subject: 'Obrigado por ter se cadastrado no CarUFFS',
    textBody: `Obrigado pelo seu cadastro no CarUFFS, clique no link: ${link}, para confirmar seu email e finalziar seu cadastro`,
    htmlTemplate: template
  });
}

module.exports = {
  sendConfirmationEmail
}
