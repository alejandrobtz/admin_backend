const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hosptital = require('../models/hospital');


const updateFile = async(entitytype, id, fileName) => {

    switch (entitytype) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log("Doctor not found");
                return false;
            }

            const oldPath = `./uploads/doctors/${ doctor.img}`;
            if(fs.existsSync(oldPath)){
                //removes existing img
                fs.unlinkSync(oldPath);
            }

            doctor.img = fileName;
            await doctor.save();

            //return true;
            
        break;

        case 'hospitals':
        
        break;

        case 'users':
        
        break;
    
        default:
            break;
    }

}


module.exports = {
    updateFile
}