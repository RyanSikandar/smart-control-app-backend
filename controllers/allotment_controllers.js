const asyncHandler = require('express-async-handler');
const facility_model = require('../models/facility_model');
const Allotment = require('../models/allotment_model');

//adds the allotment and updates the facility's allottee attribute
const addAllotment = asyncHandler(async (req, res) => {
    const { Fcode, Allottee, Acode, dateOfOccupation } = req.body;

    // Check if the facility exists
    const facility = await facility_model.findOne({ Fcode });
    if (!facility) {
        return res.status(404).json({ error: 'Facility not found' });
    }

    // Update the allottee attribute of the facility
    facility.Allottee = Allottee;
    facility.Status = 'Allotted';
    await facility.save();

    // Create a new allotment entry
    const allotment = await Allotment.create({
        Fcode,
        Allottee,
        Acode,
        dateOfOccupation
    });

    res.status(201).json({ message: 'Allotment created successfully', data: allotment });
});

//get allotment info by id
const getAllotment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const allotment = await Allotment.findById(id);
    if (allotment) {
        res.status(201).json({
            data: allotment
        })
    }
    else {
        res.status(400);
        throw new Error("Allotment not found");
    }

});

//get allotment info and also the facility info for that fcode in the allotment
const getAllAllotmentInfo = asyncHandler(async (req, res) => {
    // Find all allotments
    const allotments = await Allotment.find();

    // Array to store formatted allotment information (facility info included)
    const formattedAllotments = [];

    // Now for each allotment, find the facility and include its information
    for (const allotment of allotments) {
        const facility = await facility_model.findOne({ Fcode: allotment.Fcode });

        if (facility) {
            formattedAllotments.push({
                allotmentCode: allotment.Acode,
                facilityCode: allotment.Fcode,
                dateOfOccupation: allotment.dateOfOccupation,
                facilityInfo: {
                    City: facility.City,
                    Allottee: facility.Allottee,
                    Status: facility.Status,
                    Address: facility.Address
                },
            });
        }
    }

    res.status(200).json({ data: formattedAllotments });
});

module.exports = {
    addAllotment,
    getAllAllotmentInfo,
    getAllotment
};
