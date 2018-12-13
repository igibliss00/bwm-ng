const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require('moment');

exports.createBooking = function(req, res) {
    const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
    const user = res.locals.user;
    
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days});
  
    Rental.findById(rental._id)
          .populate('bookings')
          .populate('user')
          .exec(function(err, foundRental) {
  
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
    
        if (foundRental.user.id === user.id) {
            return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
        }

        if(isValidBooking(booking, foundRental)) {
            booking.save();
            //update rental, update user
            return res.json({'created': true });
        } else {
            return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Chosen dates are already taken!'}]});
        }
    })
}

function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every(function(booking){
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);
            
            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

            return ((actualStart < proposedStart && actualEnd < proposedEnd) || (proposedEnd < actualEnd && proposedStart < actualStart)) 
        });
    }

    return isValid;
}