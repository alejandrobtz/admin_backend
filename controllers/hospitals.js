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

const updateHospitals = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDb = await Hospital.findById(id);
        
        if(!hospitalDb){
            return res.status(404).json({
                ok: false, 
                msg: "hospital not found"
            });
        }

        const hospitalUpdates = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate( id, hospitalUpdates, { new: true } );

        res.json({
            ok:true, 
            hospital: hospitalUpdated
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Speak with admin"
        })
    }

}

const deleteHospitals = async(req, res = response) => {

    const id = req.params.id

    try {
        
        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            res.status(404).json({
                ok: false,
                msg:"hospital was not found"
            });
        }
        
        await Hospital.findByIdAndDelete(id)
        
        res.status(200).json({
            ok:true, 
            msg: `Hospital ${ hospitalDb.name } was deleted`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"error occured deleting hospital"
        });
    }

}


module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}