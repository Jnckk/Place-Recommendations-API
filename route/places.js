const express = require("express");
const fetchData = require("./fetchdataset");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await fetchData();

    // Sort by place_id (ascending)
    data.sort((a, b) => {
      return a.place_id - b.place_id;
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
