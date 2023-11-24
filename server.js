const express = require('express');
const db = require("./config/Database");
const router = require("./routes/router");
const Users = require("./models/Users");

const app = express();
const port = 3000;

try {
    db.authenticate();
    console.log("Database Connected");
} catch (error) {
    console.error(error);
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});