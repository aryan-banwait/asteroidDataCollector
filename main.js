import 'dotenv/config';

import {
    fetchNasaData,
    potentiallyHazardousAsteroids,
    averageAsteroidDiameterInMeters,
    averageAsteroidVelocity,
    averageMissDistanceInKM
} from './nasaUtils.js';

import { writeDataToCsv } from './csvParser.js';


function getYesterdaysDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


async function main() {
    const date = getYesterdaysDate()
    const data = await fetchNasaData(date, process.env.NASA_API_KEY);
    const dangerousAsteroids = potentiallyHazardousAsteroids(data, date);

    const nasaDataObject = {
        'Date': date,
        'Potentially Dangerous Asteroids': dangerousAsteroids.length,
        'Average Asteroid Diameter (m)': averageAsteroidDiameterInMeters(dangerousAsteroids),
        'Average Asteroid Velocity (km/h)': averageAsteroidVelocity(dangerousAsteroids).averageKMPH,
        'Average Asteroid Velocity (km/s)': averageAsteroidVelocity(dangerousAsteroids).averageKMPS,
        'Average Miss Distance (km)': averageMissDistanceInKM(dangerousAsteroids)
    };

    await writeDataToCsv(nasaDataObject);
}

main();





