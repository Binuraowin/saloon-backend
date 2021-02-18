const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:{type:String, required: true},
    userName:{type:String, required: true},
    date:{type:Date, required: true},
    time: { type: String, required: true },
    service: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    consumer: { type: String, required: true },
});

module.exports = mongoose.model('Appointment',appointmentSchema);