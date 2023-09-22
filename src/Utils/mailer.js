const nodemailer = require('nodemailer');
const config = require('../config/config');

const mailertemplate=`Hello This is Yatnish Manik`

function mailer(req,res,emailto){
const transporter = nodemailer.createTransport({
    service:'Gmail', 
    auth: {
      user: config.EMAIL_CONFIG,
      pass: config.PASS, 
    },
  });
  // Email content
  const mailOptions = {
    from: config.EMAIL_CONFIG,
    to: emailto,
    subject: 'Asset_Infinity',
    text:mailertemplate
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.send(error);
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
  });
}
module.exports = mailer;
