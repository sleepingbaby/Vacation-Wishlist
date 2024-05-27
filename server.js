require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes");
const exphbs = require("express-handlebars");

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

// Enables us to grab cookies from the session
app.use(cookieParser());

// Middleware to parse JSON and URL-encoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to servce static files from "public" like CSS or JS files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars
// const hbs = create({
//   extname: "hbs",
//   layoutsDir: path.join(__dirname, "views", "layouts"),
//   partialsDir: path.join(__dirname, "views", "partials"),
//   defaultLayout: "main",
// });

const hbs = exphbs.create({ extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(routes);

// Endpoints for user requests

app.listen(3000, () => console.log("Server is Running"));
