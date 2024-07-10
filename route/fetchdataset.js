// route/fetchdataset.js
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, "..", "Dataset", "Dataset.csv");

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          place_id: data.place_id,
          rating: data.rating,
          category: data.category,
          place: data.place,
          city: data.city,
          description: data.description,
          price: data.price,
          phone: data.phone,
          sites: data.sites,
          travel1: data.travel1,
          travel2: data.travel2,
          travel3: data.travel3,
          travel4: data.travel4,
          images: `https://enon8okxb2auhfev.public.blob.vercel-storage.com/Images/${data.place_id}.jpg`,
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = fetchData;
