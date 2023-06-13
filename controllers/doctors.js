const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name')
                                .populate('hospital', 'name')
    

    res.json({
        ok:true, 
        doctors
    });
}

const createDoctor = async (req, res = response) => {

    const uid = req.uid; 
    const hospitalId = req.hospitalId;
    try {
    
    const doctor = new Doctor({
        user: uid,
        hospital: hospitalId,
        ...req.body
    });

    doctorDB = await doctor.save();

    res.json({
        ok:true, 
        doctor: doctorDB
    });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:'speak with the admin'
        });
        
    }

}

const updateDoctor = (req, res = response) => {

    res.json({
        ok:true, 
        msg:'updateDoctor'
    });
}

const deleteDoctor = (req, res = response) => {

    res.json({
        ok:true, 
        msg:'deleteDoctor'
    });
}


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}