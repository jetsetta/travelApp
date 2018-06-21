class Trip {
  constructor(departureCity, arrivalCity, departureDate, returnDate,imageURL, tripID){
    this.departureCity = departureCity
    this.arrivalCity = arrivalCity
    this.departureDate = departureDate
    this.returnDate = returnDate
    this.imageURL = imageURL
    this.tripID = tripID
  }
}

module.exports = Trip
