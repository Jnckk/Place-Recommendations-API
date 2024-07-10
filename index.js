const express = require("express");
const cors = require("cors");
const placesRouter = require("./route/places");
const categoryRouter = require("./route/category"); 

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/places", placesRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
