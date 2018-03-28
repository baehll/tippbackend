let express = require("express");
let app     = express();
let fs      = require("fs");
let path    = require("path");
let mySqlScript = require(__dirname + "\\db\\mySqlScript");

app.get("/listUsers", function(req, res){
  fs.readFile(__dirname + "/data/user.json", "utf8", function(err, data){
    console.log(data);
    res.end(data);
  });
});

//mySqlScript.createTables();

mySqlScript.fillDefaultDB();

app.listen(3000);

console.log("Running at Port 3000");
