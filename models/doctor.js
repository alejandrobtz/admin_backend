const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

});

/*
    Every time a serilizing is required, using this configuration, I can 
    modify the name of the attributes comming from db, as we made in this example witht the
    id
    This won't modify the database
*/
DoctorSchema.method('toJSON', function() {
    const { __v,  ...object } = this.toObject();

    return object; 
});

module.exports = model('Doctor', DoctorSchema);