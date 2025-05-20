const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRoutes");
require("dotenv").config();

const app = express();

//Handle static assets
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

// EJS templating
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// App middleware
app.use(express.urlencoded({ extended: false }));


// Router
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("app listening on port " + PORT));