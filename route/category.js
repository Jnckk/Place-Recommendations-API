const express = require("express");
const fetchData = require("./fetchdataset");

const router = express.Router();

router.get("/", async (req, res) => {
  const categoryName = req.query.category;

  try {
    let data = await fetchData();

    data = data.filter(
      (place) => place.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (data.length === 0) {
      res.status(404).json({
        error: "true",
        message: `Category '${categoryName}' not found`,
        listPlaces: [],
      });
    } else {
      data.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return a.place.localeCompare(b.place);
      });

      res.json({
        error: "false",
        message: `Places in category '${categoryName}' fetched successfully`,
        listPlaces: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "",
      listPlaces: [],
    });
  }
});

module.exports = router;
