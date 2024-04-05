const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    complainantName: {
        type: String,
        required: [true, "Please add a name"]
    },
    Fcode: {
        type: String,
        required: [true, "Please add a Facility Code"]
    },
    Contact: {
        type: Number,
        required: [true, "Please add a contact number"],
    },
    ComplaintNo: {
        type: String,
        required: [true, "Please add a Complaint Number"],
        unique: true
    },
    Nature: {
        type: String,
        required: [true, "Please add a nature of complaint"]
    },
    Description: {
        type: String,
        required: [true, "Please add a description"]
    },
    Priority: {
        type: String,
        required: [true, "Please add a priority"]
    },
    complainantAddress: {
        type: String,
        required: [true, "Please add a complainant address"]
    },
    Date: {
        type: String,
        required: [true, "Please add a date"]

    },
    Status: {
        type: String,
        default: "Registered"
    },
    Technician: {
        type: String,
        default: ""
    },
    Deadline: {
        type: String,
        default: ""
    },
    Remarks: {
        type: String,
        default: ""
    },

}
);

const Complains = mongoose.model('Complain', complainSchema);

module.exports = Complains;
