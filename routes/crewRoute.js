const express = require('express');
const router = express.Router();
const crewController = require('../controllers/crewController');

router  
    .route('/allCrew')
    .get(crewController.allCrew);

router
    .route('/createCrew')
    .get(crewController.crewForm)
    .post(crewController.createCrew);

router
    .route('/quals')
    .get(crewController.qualForm)
    .post(crewController.createQuals);

router
    .route('/allQuals')
    .get(crewController.allQuals);


module.exports = router;