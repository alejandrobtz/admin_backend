const { response } = require('express')
const Hospital = require('../models/hospital');



const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name')

    res.json({
        ok:true, 
        hospitals
    });
}

const createHospitals = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {

        const hostpitalDB = await hospital.save();

        res.json({
            ok:true, 
            hospital: hostpitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'speak with admin'
        })
    }



}

const updateHospitals = (req, res = response) => {

    res.json({
        ok:true, 
        msg:'updateHospitals'
    });
}

const deleteHospitals = (req, res = response) => {

    res.json({
        ok:true, 
        msg:'deleteHospitals'
    });
}


module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}