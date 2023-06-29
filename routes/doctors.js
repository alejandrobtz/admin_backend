/*
    Route: /api/doctors
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');


const router = Router();

//Get Doctors
router.get('/', getDoctors);

//Create Doctor
router.post('/', 
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('hospital', 'hospital is required').not().isEmpty(),
        check('hospital', 'hospital id most be a valid id required').isMongoId(),
        validateFields
    ],
    createDoctor
);

//Update Doctor
router.put('/:id',
    [ 
        validateJWT,
        check('name', "name is mandatory").not().isEmpty(),
        check('hospital', "hospital id must be a valida id").isMongoId(),
        validateFields
    ],
    updateDoctor 
);

//Delete Doctor
router.delete('/:id', validateJWT ,deleteDoctor);


module.exports = router;