/*
    Route: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')


const router = Router();
router.get('/', getUsers);

router.post('/', 
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        validateFields
    ],
    createUser
);

router.put('/:id', 
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete('/:id', deleteUser);


module.exports = router;