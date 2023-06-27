const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hosptital = require('../models/hospital');
const path = require('path');

const removeFile = ( path ) => {
    if(fs.existsSync(path)){
        //removes existing img
        fs.unlinkSync(path);
    }

}

const validateFileExists = ( path ) => {
    return fs.existsSync( path ) ? true : false;
}

const updateFile = async(entitytype, id, fileName) => {
    let oldPath = '';

    switch (entitytype) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log("Doctor not found");
                return false;
            }

            oldPath = `./uploads/doctors/${ doctor.img }`;
            removeFile(oldPath);
   
            doctor.img = fileName;
            await doctor.save();
            return true;
            
        break;

        case 'hospitals':

        const hospital = await Hosptital.findById(id);
        if(!hospital){
            console.log("Hospital not found");
            return false;
        }

        oldPath = `./uploads/hospitals/${ hospital.img }`;
        removeFile(oldPath);

        hospital.img = fileName;
        await hospital.save();
        return true;
        
        break;

        case 'users':

        const user = await User.findById(id);
        if(!user){
            console.log("User not found");
            return false;
        }

        oldPath = `./uploads/users/${ user.img }`;
        removeFile(oldPath);

        user.img = fileName;
        await user.save();
        return true;
        break;
    
        default:
            break;
    }

}


module.exports = {
    updateFile,
    validateFileExists
}