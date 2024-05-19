const mongoose = require('mongoose')
const { Schema } = mongoose;

const PatientSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    versionKey: false
});

module.exports = mongoose.model('patient_data',PatientSchema);