const User = require('../models/user');
const  { response } = require('express');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok:true,
        users: users
    });
}

const createUser = async (req, res = response) => {
    const { name, password, email } = req.body;
    

    try {
        const existedEmail = await User.findOne({ email });
        if(existedEmail){
            return res.status(400).json({
                ok: false, 
                msg:"Email already registered"
            })
        }
        const user = new User(req.body);
        await user.save();
        
        res.json({
            ok:true,
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"unexpected error occured"
        });
    }

}



module.exports = {
    getUsers,
    createUser
}