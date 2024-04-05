const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
    Acode: {
        type: String,
        required: [true, "Please add an Allotment Code"]
    },
    Fcode: {
        type: String,
        required: [true, "Please add a Facility Code"]
    },
    Allottee: {
        type: String,
        required: true,
        default: ""
    },
    dateOfOccupation: {
        type: String,
        required: [true, "Please add a date of occupation"]
    }
});

const Allotment = mongoose.model('Allotment', allotmentSchema);

module.exports = Allotment;
