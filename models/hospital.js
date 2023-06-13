const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/*
    Every time a serilizing is required, using this configuration, I can 
    modify the name of the attributes comming from db, as we made in this example witht the
    id
    This won't modify the database
*/
HospitalSchema.method('toJSON', function() {
    const { __v,  ...object } = this.toObject();
    return object; 
});

module.exports = model('Hospital', HospitalSchema);