const express = require('express');
const app = require('express')();
const mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var session = require('express-session');

const User = require('./public/user');
const Trip = require('./public/trip');

let users  = []
let currentUser = {}


app.use(session({
  secret: 'justwork',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine', 'mustache')

app.get('/',function(req,res){
  res.render('index')
})

app.post('/register', function(req, res){
  let username = req.body.username
  let password = req.body.password

  if (req.session){
    req.session.username = username
    let user = new User (username, password)

    users.push(user)
  }

  res.redirect('/login')
})

app.get('/login',function(req,res){
  res.render('login')
})

app.post('/login', function(req, res){
  let username = req.body.username
  let password = req.body.password
  let foundUser = false

  currentUser = users.find(usernameDuplicates)

  function usernameDuplicates(user) {
    if (user.username == username && user.password == password) {
      foundUser = true
      return user.username
    }}

  if (foundUser){
    res.render('trips',{tripList : currentUser.trips})
  }

  else {
    res.redirect('/login-error')
  }

  var hour = 3600000
  req.session.cookie.expires = new Date(Date.now() + hour)
  req.session.cookie.maxAge = hour
})

app.get('/login-error', function(req, res) {
  res.render('login-error')
})

app.get('/logout', function(req,res){
  req.session.destroy()

  res.redirect('/login')
})

app.get('/trips', function(req, res){
  res.render('trips',{tripList : currentUser.trips})
})

//Create a post route for /trips
app.post('/trips',function(req,res){
  let departureCity = req.body.departureCity
  let arrivalCity = req.body.arrivalCity
  let departureDate = req.body.departureDate
  let returnDate = req.body.returnDate
  let imageURL = req.body.imageURL
  let tripID = guid()

  let trip = new Trip (departureCity, arrivalCity, departureDate, returnDate, imageURL, tripID)

  currentUser.trips.push(trip)
  console.log(imageURL)

  res.render('trips', {tripList : currentUser.trips})
})

app.get('/deleteTrip', function(req, res){
  let tripID = req.body.tripID

  users.find(function(user) {return user.username == currentUser.username}).trips
  = users.find(function(user) {return user.username == currentUser.username}).trips
  .filter(function(trip){return trip.tripID != tripID})

  res.render('trips', {tripList : currentUser.trips})
})

function validateLogin(req,res,next) {
  if(req.session.username) {
    next()
  } else {
    res.redirect('/login')
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

app.listen(3000, () => console.log("Houston we DON'T have a problem"))
