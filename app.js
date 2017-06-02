var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var nodemailer = require('nodemailer');


var app=module.exports=express();

var port = process.env.PORT || 3000;
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/style'));
app.use(express.static(__dirname +'/files'));
app.use(bodyParser());
app.get('/projects',function(req,res,next){
  res.sendFile(path.join(__dirname, './public', 'projects.html'));
})
app.post('/contactus',function(req,res,next){
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport( {
      service: 'Gmail',
      auth: {
          user: "contactme.mohamedalkhamees@gmail.com",
          pass: "contactme"
      }
  });
  //Mail options
  var message='Name: '+req.body.name+'\n'+'Email: '+req.body.email+'\n'+'Message: '+req.body.message;
  console.log(message)
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'alkhamis@email.arizona.edu',
      subject: req.body.subject,
      text: message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
        console.log('failed');
      }
      //Yay!! Email sent
      else {
          res.sendFile(path.join(__dirname, './public', 'success.html'));
      }
  });
})
app.get('/success',function(req,res,next){
  res.sendFile(path.join(__dirname, './public', 'fail.html'));
})

app.listen(port,function(){
  console.log('listening on port '+port);
});
