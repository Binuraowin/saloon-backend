const mongoose = require('mongoose');

const productShema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:{type:String, required: true},
    date:{type:Date, required: true},
    time: { type: TimeRanges, required: true },
    service: { type: TimeRanges, required: true }
});

module.exports = mongoose.model('Product',productShema);