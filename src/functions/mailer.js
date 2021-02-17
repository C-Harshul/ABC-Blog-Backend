const nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testharshul@gmail.com',
      pass: 'Abc@12345'
    }
  });

  const mailIds = ['chandrasekharharshul@gmail.com','harshuc.2019@vitstudent.ac.in','nitlog8@gmail.com']

const mail = (message,callback) => {
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