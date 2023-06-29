/*
    Route: /api/login
*/
const { Router } = require('express');
const { validateFields } = require('../middlewares/validate-fields');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');




const router = Router();

router.post('/', 
    [
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail().not().isEmpty(),
        validateFields
    ],
    login
);

router.post('/google', 
    [
        check('token', 'google token is mandatory').not().isEmpty(),
        validateFields
    ],
    googleSignIn
);

router.get('/renew', 
    validateJWT,
    renewToken
); 

module.exports = router;