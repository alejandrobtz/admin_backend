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

const updateDoctor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const doctorDb = Doctor.findById(id);
        if(!doctorDb){
            return res.status(404).json({
                ok: false,
                msg: "Doctor was not found"
            });
        }

        const doctorUpdates = {
            ...req.body,
            user: uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate( id, doctorUpdates, { new: true } );
        
        res.json({
            ok:true, 
            doctor: doctorUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "An error occured updating doctor"
        });
    }

}

const deleteDoctor = async(req, res = response) => {
    const id = req.params.id;

    try {
        const doctorDb = await Doctor.findById(id);
        if(!doctorDb){
            return res.status(404).json({
                ok: false,
                msg: "Doctor was not found"
            });
        }

        await Doctor.findByIdAndDelete(id);
        
        res.json({
            ok:true, 
            msg: `Doctor: ${ doctorDb.name } was deleted`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "An error occured updating doctor"
        });
    }
   
}


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}