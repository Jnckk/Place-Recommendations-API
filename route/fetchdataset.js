const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from(process.env.DATABASE_TABLE_NAME)
      .select("*");

    if (error) {
      throw error;
    }

    return data.map((item) => ({
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
      images: `${process.env.DATABASE_IMAGE_URL}/${item.place_id}.jpg`,
    }));
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    throw error;
  }
};

module.exports = fetchData;
