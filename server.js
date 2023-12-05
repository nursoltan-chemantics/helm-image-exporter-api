const { createServer } = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/routes/helm");
require("dotenv").config();

const app = express();

app.use(bodyParser.text());

const port = process.env.PORT || 3005;

app.use(route);

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
