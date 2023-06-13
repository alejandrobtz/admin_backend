/*
    api/searchAll
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAllData } = require('../controllers/search');


router = Router();

//get all data (all kinds of entities ex user, hospital etc)
router.get('/:search', 
    [
        validateJWT
    ],
    getAllData
);

module.exports = router;