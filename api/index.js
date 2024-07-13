const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

const router = require("./router/router");

app.use("/api", router);

require("./database/client").checkConnection();

app.listen(port, (req, res) => {
  console.log(`Server is listening on port ${port}`);
});
