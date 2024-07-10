// places.js
const express = require("express");
const fetchData = require("./fetchdataset");

const router = express.Router();

router.get("/places", async (req, res) => {
  try {
    let data = await fetchData();

    // Sort by rating (descending) and place (ascending)
    data.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.place.localeCompare(b.place);
    });

    res.json({
      error: "false",
      message: "Places fetched successfully",
      listPlaces: data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "",
      listPlaces: [],
    });
  }
});

module.exports = router;
