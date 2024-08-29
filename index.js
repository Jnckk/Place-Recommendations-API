const express = require("express");
const cors = require("cors");
const path = require("path");
const placesRouter = require("./route/places");
const categoryRouter = require("./route/category");
const allCategoriesRouter = require("./route/allcategory");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(favicon(path.join(__dirname, "favicon.ico")));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static(path.join(__dirname, "Website UI")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Website UI", "index.html"));
});

app.use("/places", placesRouter);
app.use("/category", categoryRouter);
app.use("/allcategory", allCategoriesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});
