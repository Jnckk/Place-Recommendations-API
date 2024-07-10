const express = require("express");
const cors = require("cors");
const placesRouter = require("./route/places");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use(placesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
