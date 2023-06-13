const { response } = require('express');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const User = require('../models/user');



const getAllData = async (req, res = response) => {

    const searchTerm = req.params.search;
    const regex = new RegExp(searchTerm, 'i');

    
    const [ users, hospitals, doctors] =  await Promise.all([
        User.find({name: regex}),
        Doctor.find({name: regex}),
        Hospital.find({name: regex})
    ]);


    res.status(200).json({
        ok: true, 
        msg: "Search All ok",
        users,
        hospitals,
        doctors
    });
}


module.exports = {
    getAllData
}