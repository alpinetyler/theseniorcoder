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


app.listen(process.env.PORT || SERVER_PORT, function(){
  console.log(`The Server is now running on port ${SERVER_PORT}`)
});
