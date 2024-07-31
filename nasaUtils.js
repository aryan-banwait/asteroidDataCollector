export async function fetchNasaData(date, api_key) {
    try {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${api_key}`
        );
        return response.json();
    } catch (err) {
        console.error(err);
    }
}


export function potentiallyHazardousAsteroids(data, date) {
    const dangerousAsteroids = [];
    for (const asteroid of data['near_earth_objects'][date]) {
        if (asteroid['is_potentially_hazardous_asteroid'] === true) {
            dangerousAsteroids.push(asteroid);
        }
    }

    return dangerousAsteroids;
    
}


export function averageAsteroidDiameterInMeters(dangerousAsteroids) {
    let total = 0;
    for (let i = 0; i < dangerousAsteroids.length; i++) {
        const avrgAsteroidDiameterInMeters = 
        (dangerousAsteroids[i]['estimated_diameter']['meters']['estimated_diameter_min'] +
        dangerousAsteroids[i]['estimated_diameter']['meters']['estimated_diameter_max']) / 2;
        total += avrgAsteroidDiameterInMeters;
    }

    return (total / dangerousAsteroids.length).toFixed(2);
}


export function averageAsteroidVelocity(dangerousAsteroids) {
    let totalKMPH = 0;
    let totalKMPS = 0;
    for (let i = 0; i < dangerousAsteroids.length; i++) {
        totalKMPH += Number(dangerousAsteroids[i]['close_approach_data'][0]['relative_velocity']['kilometers_per_hour']);
        totalKMPS += Number(dangerousAsteroids[i]['close_approach_data'][0]['relative_velocity']['kilometers_per_second']);
    }

    return {
        averageKMPH: (totalKMPH / dangerousAsteroids.length).toFixed(2),
        averageKMPS: (totalKMPS / dangerousAsteroids.length).toFixed(2)
    };
}


export function averageMissDistanceInKM(dangerousAsteroids) {
    let totalMissDistance = 0;
    for (let i = 0; i < dangerousAsteroids.length; i++) {
        totalMissDistance += Number(dangerousAsteroids[i]['close_approach_data'][0]['miss_distance']['kilometers']);
    }

    return (totalMissDistance / dangerousAsteroids.length).toFixed(2);
}




