const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 200) {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error(`Failed to fetch address coordinates: ${response.data.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination coordinates are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 200) {
            if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
                throw new Error('No route found between the given origin and destination');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error(`Failed to fetch distance and time: ${response.data.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

