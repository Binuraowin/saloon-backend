const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:{type:String, required: true},
    name:{type:String, required: true},
    password: { type: String, required: true },
    service:{type:String, required: true},
    jobRole:{type:String, required: true},
    workingHours:{type:String, required: true},
    workedHours:{type:Number, required: true},
    sallery: { type: Number, required: true }
});

module.exports = mongoose.model('Employee',employeeSchema);