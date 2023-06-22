/*
    api/searchAll
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAllData, getEntitiesByType } = require('../controllers/search');


router = Router();

//get all data (all kinds of entities ex user, hospital etc)
router.get('/:search', 
    [
        validateJWT
    ],
    getAllData
);

router.get('/:entitytype/:search', 
    [
        validateJWT
    ],
    getEntitiesByType
);

module.exports = router;