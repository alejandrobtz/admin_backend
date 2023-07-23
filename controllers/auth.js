const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verifier');


const login = async(req, res = response ) => {
    const { email, password } = req.body;

    try {

        //validate email
        const usrDB = await User.findOne({ email });
        if(!usrDB) {
            return res.status(404).json({
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
        });
        
    }
}

const googleSignIn = async( req, res = response ) => {

    try {
        
        const { email, name, picture } = await googleVerify( req.body.token );

        const usrDB = await User.findOne( { email } );

        let usr;

        if(! usrDB ){
            usr = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usr = usrDB
            usr.google = true
        }


        //saving user
        await usr.save();

        //generate JWT
        const token = await generateJWT( usr.id );

        res.json({
            ok: true, 
            name,
            email, 
            picture,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false, 
            msg: `Wrong Google's token`
        });
    }
    
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(req.uid);

    const userDb = await User.findById(uid);

    if(!userDb){
        res.status(401).json({
            ok: false,
            msg: "No user found with the given id"
        });
    }

    res.json({
        ok: true, 
        token,
        user: userDb
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken

}