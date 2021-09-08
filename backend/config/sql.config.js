let mysql = require("mysql");
require("dotenv").config();
console.log(process.env.DATABASE_HOST);
let con = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6435376',
    password: '9mrzSJZBpU',
    database: 'sql6435376',
    multipleStatements: true
});

con.connect(function (err) {
    if (err) {
        console.log("Error in DB connection");
        console.log("err", err);
    } else console.log("Connected!");
});

module.exports = con;
