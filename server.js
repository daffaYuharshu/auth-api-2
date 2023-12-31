const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database");
const router = require("./routes/router");

dotenv.config();
const app = express();
const port = 5000;

try {
  db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000",
  })
);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
