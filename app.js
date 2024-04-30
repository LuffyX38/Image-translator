const express = require("express");
//starts express app
const app = express();
const dotenv = require("dotenv");
const compression = require("compression");
const path = require("path");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
dotenv.config({ path: "./.env" });
const homePage = require("./routes/pages");

const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

app.use(compression());
app.set("view engine", "hbs");

db.connect((err) => {
  if (err) {
    console.log("error while connecting to the database, ", err);
  } else {
    console.log("successfully connected to the DATABASE...");
  }
});

app.use("/", homePage);
app.use("/api/postData", homePage);
app.use("/auth", require("./routes/auth"));

app.listen("4545", () => {
  console.log("server is running on port 4545");
});
