let express = require("express");
let app = express();
let fs = require("fs");
let path = require("path");
let mySqlScript = require(__dirname + "\\db\\mySqlScript");

/*
app.get("/listUsers", function(req, res){
  fs.readFile(__dirname + "/data/user.json", "utf8", function(err, data){
    console.log(data);
    res.end(data);
  });
});
*/

app.get("/matches/:stage/:group", (req, res) => {
    mySqlScript.parseMatchesForStageAndGroups((err, result) => {
        console.log(result);
        res.end(JSON.stringify(result));
    }, req.params.stage, req.params.group);
});

app.get("/matches/currentMatches", (req, res) => {
    mySqlScript.parseCurrentMatches((err, result) => {
        res.end(JSON.stringify(result));
    });
});

//get player tips for matches in current stage
app.get("/players/playerTips/:id", (req, res) => {
    mySqlScript.parsePlayerTipsForCurrentStage((err, result) => {
        res.end(JSON.stringify(result));
    }, req.params.id);
});

app.post("/players/addPlayer/:name", (req, res) => {
    mySqlScript.addPlayer((err, result) => {
        res.end({ "result": "gucci" });
    }, req.params.name);
});

app.get("/players/allPlayers", (req, res) => {
    mySqlScript.parsePlayers((err, result) => {
        if (err) return console.log(err);
        res.end(JSON.stringify(result));
    });
});

/*
mySqlScript.createTables();

mySqlScript.fillDefaultDB();
*/

app.listen(3000);

console.log("Running at Port 3000");