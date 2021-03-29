
//const nodemailer = require('nodemailer');
/*const nodemailer = require("nodemailer");

const path = require('path');

const hbs = require('nodemailer-express-handlebars');
const {host,port,user,pass} = require('../config/mail.json');
const  transport = nodemailer.createTransport({
    host,
    port ,
    auth: {
      user,
      pass
    }
  });
 
  transport.use('compile', hbs({
      viewEngine: 'handlebars',
      viewPath: path.resolve('../config/mail.json'),
      exName: '.html',
  }));
 /*
 transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));
 
  module.exports =transport;

  */
 
 const nodemailer = require("nodemailer");


  

 // async..await is not allowed in global scope, must use a wrapper
 async function main() {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();
 
  
 
   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
     host: 'smtp.ethereal.email',
     port: 587,
     auth: {
         user: 'sonya.von@ethereal.email',
         pass: 'kJyRSTHw2K4tTmmgyH'
     }
 });
 
 
   // send mail with defined transport object
   let info = await transporter.sendMail({
     from: '"Fred Foo 👻" <adilson.manueel1@hotmail.com>', // sender address
     to: "clesiasantos123@outlook.pt", // list of receivers
     subject: "Hello ✔", // Subject line
     html:"Olá Esqueceu a password? <a href='#'>Recopera palavra pass</a>",
     
   });
 
   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 
   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 }
 
 main().catch(console.error);