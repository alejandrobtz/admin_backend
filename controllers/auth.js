const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const login = async(req, res = response ) => {
    const { email, password } = req.body;

    try {

        //validate email
        const usrDB = await User.findOne({ email });
        if(!usrDB) {
            return res.statusCode(404).json({
                ok: false,
                msg: 'email was not found'
            });
        }

        // // validate password

        const validPassword = bcrypt.compareSync( password, usrDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false, 
                msg:'Invalid password'
            });
        }

        const token = await generateJWT( usrDB.id );

        return res.json({
            ok: true,
            token
        });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Speak with the admin'
        })
        
    }
}

module.exports = {
    login
}