const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const favicon = require('serve-favicon')
const path = require('path')
require('dotenv/config');

const PORT = 3021;

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

const {SERVER_PORT, GMAIL_USER, GMAIL_PASS} = process.env

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
})

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
})

app.get("/videos", (req, res) => {
  res.sendFile(__dirname + "/videos.html");
})

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
})

app.post('/contact', (req, res) =>{

  // instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  })

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let message = req.body.message;

//console.log(`${firstName} ${lastName} ${email}`)

  // specify what the email will look like
  const mailOptions = {
    from: `${email}`,
    to: GMAIL_USER,
    subject: `Message from ${email}`,
    text: `Name: <h1>${firstName} ${lastName}</h1> <br>Email: ${email} <br>${message}`
  }

  // attempt to send the Email
  smtpTrans.sendMail(mailOptions, (error, response) => {
    if(error) {
      res.sendFile(__dirname + "/failure.html")
      //console.log("mail failed to send" + error)
    }else{
      // res.render('contact-success') // show a page indicating success
      res.sendFile(__dirname + "/success.html")
    }
  })
})


app.listen(process.env.PORT || SERVER_PORT, function(){
  console.log(`The Server is now running on port ${SERVER_PORT}`)
});
