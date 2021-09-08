const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 8000;
require('dotenv').config();

const cors = require("cors");
const employee = require("./api/employee/employee.route");
Main();

function Main() {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded())
    app.use(express.json())
    MainRoutes();
}

function MainRoutes() {
    app.use("/", employee);
}

app.listen(PORT, () => {
    console.log("server is running on the " + PORT);
});