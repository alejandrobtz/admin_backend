/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')


const router = Router();

//Get Users
router.get('/', validateJWT ,getUsers);

//Create User
router.post('/', 
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        validateFields
    ],
    createUser
);

//Update User
router.put('/:id', 
    [
        validateJWT,
        check('name', 'name is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validateFields
    ],
    updateUser
);

//Delete User
router.delete('/:id', validateJWT, deleteUser);


module.exports = router;