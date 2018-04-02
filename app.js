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

app.get("/matches/:stage/:group", (req, res) => {
  mySqlScript.parseMatches((err, result) =>{
    console.log(result);
    res.end(JSON.stringify(result));
  }, req.params.stage, req.params.group);
});

app.get("/players/allPlayers", (req, res) =>{
  mySqlScript.parsePlayers((err, result) =>{
    if(err) return console.log(err);
    res.end(JSON.stringify(result));
  });
});

/*
mySqlScript.createTables();

mySqlScript.fillDefaultDB();
*/

app.listen(3000);

console.log("Running at Port 3000");
