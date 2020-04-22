const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const router = require("./route");
app.use(cors());

app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is up and running on http://localhost:" + port);
});
