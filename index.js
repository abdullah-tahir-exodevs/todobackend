const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const user = require("./routes/user-routes");
const ConnectDB = require("./utilis/connectDb");
require("dotenv").config();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.options((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-REquested-with,Authorization"
  );
  res.header("Access-Control-Allow-Origin", "PUT,POST,PATCH,DELETE,GET");
  res.status(200).json({});
});
app.use("/api/user", user);

ConnectDB()
  .then((res) => {
    console.log("Connection to MongoDB");
    app.listen(3001, () => console.log(`the Server Started at 3001`));
  })
  .catch((error) => console.log(error.message));
