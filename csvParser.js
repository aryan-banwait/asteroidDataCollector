import { promises as fs } from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

export async function writeDataToCsv(nasaInfoObject) {
    const csvFilePath = 'nasa_data.csv';
    const headers = Object.keys(nasaInfoObject).map(key => ({ id: key, title: key }));
    const fileExists = await fs.access(csvFilePath).then(() => true).catch(() => false);

    const csvWriter = createObjectCsvWriter({
        path: csvFilePath,
        header: headers,
        append: fileExists
    });

    await csvWriter.writeRecords([nasaInfoObject]);
}
