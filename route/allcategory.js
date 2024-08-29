const express = require("express");
const fetchData = require("./fetchdataset");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await fetchData();

    const categories = [...new Set(data.map((item) => item.category))].sort(
      (a, b) => a.localeCompare(b)
    );

    res.json({
      error: "false",
      message: "Categories fetched successfully",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "",
      categories: [],
    });
  }
});

module.exports = router;
