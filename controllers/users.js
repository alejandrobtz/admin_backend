const User = require('../models/user');
const  { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    //if not pagination info is comming then start from cero
    const from = Number(req.query.from) || 0;

    //destructuring and logic for pagination
    const [users, count] = await Promise.all([
        User.find({}, 'name email role google img')
            .skip( from )
            .limit( 10 ), //put the limit of records you want to send to the front

        User.countDocuments()
    ]);



    res.json({
        ok:true,
        users,
        count
    });
}

const createUser = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const existedEmail = await User.findOne({ email });
        if(existedEmail){
            return res.status(400).json({
                ok: false, 
                msg:"Email already registered"
            })
        }
        
        const user = new User(req.body);
        
        //encrypting password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //saving user
        await user.save()
        const token = await generateJWT(user.id);
        
        res.json({
            ok:true,
            user,
            token

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"unexpected error occured"
        });
    }

}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    //Validate token and check if the right user
    
    try {

        const usrDB = await User.findById( uid );
        if(!usrDB){
            return res.status(404).json({
                ok:false,
                msg:"user does not exist with that id"
            });
        }
        
        const {password, google, email,  ...fields } = req.body;
        
        if(usrDB.email !== email){
            const emailExist = await User.findOne({ email });

            if( emailExist ){
                return res.status(400).json({
                    ok: false, 
                    msg: `Invalid Email, email: ${ email }  is associated with another user`
                });
            }
        }

        //Updates
        fields.email = email; 
        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok:true,
            usr: userUpdated,
            msg:"user updated successfully"

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg:"Something went wrong updating the user",
            email: emailExist
        });
    }
}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usrDB = await User.findById( uid );
        
        if(!usrDB){
            return res.status(404).json({
                ok: false, 
                msg: "User was not found"
            });
        }

        await User.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            id: uid,
            msg: `User with id ${ uid } was deleted`
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Unexpected error deleting user"
        })
    }
    
}


module.exports = {
    getUsers,
    createUser, 
    updateUser,
    deleteUser
}