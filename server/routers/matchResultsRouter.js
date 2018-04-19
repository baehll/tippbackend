const express = require("express");
const router = express.Router();

const con = require("../helpers/connector");
let stageHelper = require("../helpers/stageHelper");

//getLatestResults
router.get("/", async(req, res, next) => {
    let stage = await stageHelper();
    let sqlStatement = "SELECT TABLE_MATCHES.matchID, TABLE_MATCHES.stageID as STAGE, (SELECT TABLE_TEAMS.teamID FROM TABLE_TEAMS WHERE TABLE_MATCHES.teamoneID = TABLE_TEAMS.teamID) TEAM1, (SELECT TABLE_TEAMS.teamID from TABLE_TEAMS WHERE TABLE_MATCHES.teamtwoID = TABLE_TEAMS.teamID) TEAM2 FROM TABLE_MATCHES HAVING TABLE_MATCHES.stageID = " + stage + " AND (team1 is not null and team2 is not null)";
    console.log(stage);
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

module.exports = router;