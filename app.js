const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

let trips = []

var bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.engine('mustache',mustacheExpress())

app.set('views','./views')

app.set('view engine', 'mustache')

app.post('/trips',function(req,res){
  let departureCity = req.body.departureCity
  let arrivalCity = req.body.arrivalCity
  let imageURL = req.body.imageURL
  let departureDate = req.body.departureDate
  let returnDate = req.body.returnDate

  trips.push({tripID : guid(),
    departureCity : departureCity ,
    arrivalCity : arrivalCity ,
    imageURL : imageURL ,
    departureDate : departureDate ,
    returnDate : returnDate})

  res.render('index', {tripList : trips})
})

app.get('/',function(req,res){
  res.render('index',{tripList : trips})
})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

app.listen(3000, () => console.log("Houston we DON'T have a problem"))
