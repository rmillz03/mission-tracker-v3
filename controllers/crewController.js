const session = require('express-session');
const Crew = require('../models/crewModel');
const Quals = require('../models/qualModel');

// *****************************
//         ALL CREW
// *****************************
exports.allCrew = async (req,res) => {
    let [crew, _] = await Crew.findAll();

    res.render('pilots/allPilots.ejs', {aircrew: crew});
    //res.json(crew);
}

// *****************************
//     CREATE CREW MEMEBER
// *****************************
exports.crewForm = (req,res) => {
    res.render('pilots/pilotForm.ejs');
}

exports.createCrew = async (req, res) => {
    const body = req.body;

    //console.log(body.myRadios);

    let aircrew = new Crew(
        body.first,
        body.last,
        body.rank,
        body.callSign,
        body.myRadios,
        body.raven,
        body.rogue
    );

    aircrew = await aircrew.save(); //save new record

    [someone, _] = await Crew.getLast(); //get last record of table

    //console.log("Aircrew: " + someone[0].crewID)

    req.session.pilotID = someone[0].crewID
    req.session.pilotName = someone[0].rank + " " + someone[0].firstName + " " + someone[0].lastName;
    req.session.isPilot = someone[0].pilot;

    res.redirect('/crewRoute/quals');
}

// *****************************
//     QUALIFICATIONS
// *****************************

exports.qualForm = (req,res) => {
    res.render('pilots/qualForm.ejs', 
                {name: req.session.pilotName, 
                pilot: req.session.isPilot}
                );
}

exports.createQuals = async (req, res) => {
    const body = req.body;

    let crewQuals = new Quals (
        req.session.pilotID,
        body.PC,
        body.PI,
        body.flyUH60A,
        body.flyUH60AP,
        body.flyUH60L,
        body.flyUH72A,
        body.flyCH53E,
        body.flyFA18A
    );

    crewQuals = await crewQuals.save();

    res.redirect('/crewRoute/allQuals');
}

exports.allQuals = async (req, res) => {

    let [aircrew, _] = await Quals.findAll();

    res.render('pilots/allQuals.ejs', {aircrew: aircrew});
}