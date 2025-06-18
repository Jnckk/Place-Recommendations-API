const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const fetchData = async () => {
  try {
    const results = [];
    const csvFilePath = path.join(__dirname, '..', 'data', 'Place-Data.csv');
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const formattedData = results.map((item) => ({
            place_id: item.place_id,
            rating: parseFloat(item.rating || 0),
            category: item.category,
            place: item.place,
            city: item.city,
            description: item.description,
            price: item.price,
            phone: item.phone,
            sites: item.sites,
            travel1: item.travel1,
            travel2: item.travel2,
            travel3: item.travel3,
            travel4: item.travel4,
            images:
              item.images ||
              `https://exrnxuf9n9arrzkl.public.blob.vercel-storage.com/images/${item.place_id}.jpg`,
          }));
          resolve(formattedData);
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error fetching data from CSV:", error);
    throw error;
  }
};

module.exports = fetchData;
