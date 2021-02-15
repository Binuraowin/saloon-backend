const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:{type:String, required: true},
    date:{type:Date, required: true},
    time: { type: String, required: true },
    service: { type: String, required: true },
});

module.exports = mongoose.model('Appointment',appointmentSchema);