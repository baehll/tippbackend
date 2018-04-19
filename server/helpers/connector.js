const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    port: 4000,
    user: "root",
    password: "root",
    database: "matchdb"
});

con.connect((err) => {
    if (err) throw err;
    console.log("db connected");
})

module.exports = con;