/*
    Route: /api/users
*/
const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users')
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');


const router = Router();
router.get('/', getUsers);

router.post('/', [
    check('name', 'name is mandatory').not().isEmpty(),
    check('password', 'password is mandatory').not().isEmpty(),
    check('email', 'email is mandatory').isEmail(),
    validateFields
],
createUser
);







module.exports = router;