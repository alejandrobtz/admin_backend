/*
    Route: /api/hospitals
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals')


const router = Router();

//Get Hospitals
router.get('/', getHospitals);

//Create Hospitals
router.post('/', 
    [
        validateJWT,
        check('name', 'The hospital name is required').not().isEmpty(),
        validateFields
    ],
    createHospitals
);

//Update Hospitals
router.put('/:id', 
    [
        validateJWT,
        check('name', 'name is mandatory').not().isEmpty(),
        validateFields
    ],
    updateHospitals
);

//Delete Hospitals
router.delete('/:id', validateJWT, deleteHospitals );


module.exports = router;