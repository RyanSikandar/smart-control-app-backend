const asyncHandler = require('express-async-handler');
const Complain = require('../models/complains_model');

//Adds a complain to the db
const addComplaint = asyncHandler(async (req, res) => {
    const {
        complainantName,
        Fcode,
        Contact,
        ComplaintNo,
        Nature,
        Description,
        Priority,
        complainantAddress,
        Date,
        Status,
        Technician,
        Deadline,
        Remarks
    } = req.body;

    // Create a new complaint
    const newComplaint = await Complain.create({
        complainantName,
        Fcode,
        Contact,
        ComplaintNo,
        Nature,
        Description,
        Priority,
        complainantAddress,
        Date,
        Status,
        Technician,
        Deadline,
        Remarks
    });

    res.status(201).json({ message: 'Complaint added successfully', data: newComplaint });
});

//Completed Complain
const completeComplain = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the complain by ID and update its status to 'Completed'
        const complain = await Complain.findByIdAndUpdate(id, { Status: 'Completed' }, {
            new: true, // Return the updated complain
            runValidators: true // Run validators to ensure data integrity
        });

        if (!complain) {
            return res.status(404).json({ error: 'Complain not found' });
        }

        res.status(200).json({ data: complain });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Assigns a complain to a Technician
const assignComplain = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { Technician, Deadline, Remarks } = req.body;

    // Validate if Technician, deadline, and remarks are provided
    if (!Technician || !Deadline || !Remarks) {
        return res.status(400).json({ error: 'Technician, deadline, and remarks are required' });
    }

    try {
        // Find the complain by ID and update its attributes
        const complain = await Complain.findByIdAndUpdate(id, {
            Technician: Technician,
            Deadline: Deadline,
            Remarks: Remarks,
            Status: 'Assigned'
        }, {
            new: true, // Return the updated complain
            runValidators: true // Run validators to ensure data integrity
        });

        if (!complain) {
            return res.status(404).json({ error: 'Complain not found' });
        }

        res.status(200).json({ data: complain });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all complains
const getComplains = asyncHandler(async (req, res) => {
    const complains = await Complain.find();

    res.status(200).json({ data: complains });
});

// Export the functions
module.exports = {
    addComplaint,
    assignComplain,
    completeComplain,
    getComplains
};
