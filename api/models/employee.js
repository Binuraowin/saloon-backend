const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required: true},
    service:{type:String, required: true},
    workingHours:{type:Number, required: true},
    workedHours:{type:Number, required: true},
    sallery: { type: Number, required: true }
});

module.exports = mongoose.model('Employee',employeeSchema);