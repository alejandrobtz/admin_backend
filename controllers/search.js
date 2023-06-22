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

const getEntitiesByType = async (req, res = response) => {

    const searchTerm = req.params.search;
    const entityType = req.params.entitytype
    const regex      = new RegExp(searchTerm, 'i');

    let data = [];

    switch (entityType) {
        case 'users':
            data = await User.find({ name: regex })
            break;

        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                 .populate('user', 'name')
            break;

        case 'doctors':
            data = await Doctor.find({ name: regex })
                               .populate('hospital', 'name')
                               .populate('user', 'name')
            break;
    
        default:
            res.status(400).json({
                ok:false,
                msg:'only doctors, users or hopitals are available for searching'
            });
            break;
    }
    
    res.status(200).json({
        ok: true, 
        msg: `Search by ${ entityType } ok.`,
        entityType,
        data
    });
}


module.exports = {
    getAllData,
    getEntitiesByType
}