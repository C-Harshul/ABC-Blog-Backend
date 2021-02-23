const nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testharshul@gmail.com',
      pass: 'Abc@12345'
    }
  });



const mail = (message,mailIds,callback) => {
    console.log(message)  
    var mailOptions = {
        from: 'testharshul@gmail.com',
        to: mailIds,
        subject: 'Message from App',
        text: message,
      };
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        callback(error,undefined);
         } else {
        callback(undefined,'Email sent: ' + info.response);
       }
     });
  }
  
  module.exports = mail