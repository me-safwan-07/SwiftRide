const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (err) {
        res.status(500).json({ message: 'Coordinates not found' });
    };
};

