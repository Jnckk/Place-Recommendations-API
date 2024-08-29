const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from("Place-Dataset")
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
      images: `https://htlknuguumaoppyqlhvu.supabase.co/storage/v1/object/public/images/${item.place_id}.jpg`,
    }));
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    throw error;
  }
};

module.exports = fetchData;
