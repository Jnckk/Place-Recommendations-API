const { S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.BUCKET_REGION,
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
});

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

const checkImageExists = async (place_id) => {
  for (const ext of IMAGE_EXTENSIONS) {
    try {
      const command = new HeadObjectCommand({
        Bucket: process.env.BUCKET_BUCKET_NAME,
        Key: `${place_id}.${ext}`,
      });

      await s3.send(command);

      const imageUrl = `${process.env.DATABASE_IMAGE_URL}/${place_id}.${ext}`;
      console.log(`Found image with extension ${ext}:`, imageUrl);
      return imageUrl;
    } catch (error) {
      if (error.name === "NotFound") {
        continue;
      }
      console.error(
        `Error checking image with extension ${ext}:`,
        error.message
      );
    }
  }
  return "image not ready";
};

const fetchData = async () => {
  const supabase = createClient(
    process.env.DATABASE_URL,
    process.env.DATABASE_API_KEY
  );

  try {
    const { data, error } = await supabase
      .from(process.env.DATABASE_TABLE_NAME)
      .select("*");

    if (error) {
      throw error;
    }

    const dataWithImages = await Promise.all(
      data.map(async (item) => {
        const imageUrl = await checkImageExists(item.place_id);

        return {
          place_id: item.place_id,
          rating: item.rating,
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
          images: imageUrl,
        };
      })
    );

    return dataWithImages;
  } catch (error) {
    console.error("Error fetching data from Supabase:", error.message);
    throw error;
  }
};

module.exports = fetchData;
