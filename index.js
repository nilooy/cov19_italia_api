const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const scrapper = require("./scrapper");

app.use(cors());

app.get("/", scrapper);
app.get("/stats", scrapper);
app.get("/regione", scrapper);
app.get("/province", scrapper);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is up and running on http://localhost:" + port);
});
