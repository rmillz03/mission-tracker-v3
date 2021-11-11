const Flight = require("../models/flightModel");
const Crew = require("../models/crewModel");
const Planes = require("../models/planeModel");
const millzLib = require("../public/millzLib");

// *****************************
//         ALL FLIGHTS
// *****************************
exports.allFlights = async (req,res) => {
    let [missions, _] = await Flight.findAll();
    let julianDate = millzLib.julianDate();

    res.render('flights/allFlights.ejs', {
        missions: missions,
        julian: julianDate
    });
}

// *****************************
//         CREATE FLIGHT
// *****************************
exports.flightForm = async (req, res) => {

    //console.log("Day of Year: " + millzLib.julianDate() );

    //load recordset for pilots and planes
    let [pilots, _] = await Crew.findCrew('pilot');
    let [chiefs, x] = await Crew.findCrew('crewChief');
    let [aircraft, n] = await Planes.findAll();
    
    res.render('flights/flightForm.ejs', { 
        julian: millzLib.julianDate(),
        pilots: pilots,
        chiefs: chiefs,
        aircraft: aircraft
     });
}

exports.createFlight = async (req, res, next) => {

    let newFlight = new Flight(
        req.body
    );

    newFlight = await newFlight.save();

    res.redirect('/flightRoute/allFlights');
}
