const express = require("express");
const router = express.Router();

const con = require("../helpers/connector");

//gibt die jetztige stage zurück
const stageHelper = require("../helpers/stageHelper");

//für das heutige datum

//getMatchHistory
//callback muss async sein, um auf die antwort von stageHelper() zu warten
router.get("/history", async(req, res, next) => {
    let today = new Date();
    const sqlStatement = "SELECT TABLE_MATCHES.matchID, TABLE_MATCHES.stageID as STAGE, TABLE_MATCHES.matchdate, (SELECT TABLE_TEAMS.teamName FROM TABLE_TEAMS WHERE TABLE_MATCHES.teamoneID = TABLE_TEAMS.teamID) TEAM1, (SELECT TABLE_TEAMS.teamName from TABLE_TEAMS WHERE TABLE_MATCHES.teamtwoID = TABLE_TEAMS.teamID) TEAM2 FROM TABLE_MATCHES HAVING TABLE_MATCHES.matchdate >= '" +
        today + "' AND (team1 is not null and team2 is not null)";
    let c = con;
    try {
        await c.connect();
        let result = await c.query(sqlStatement);
        console.log(result);
        res.status(200);
        //res.end(JSON.stringify(result));
    } catch (err) {
        res.status(500);
        console.log(err);
    }
});

//getLatestMatches
router.get("/", async(req, res, next) => {
    let today = new Date();
    const currentStage = await stageHelper().then((fullfilled) => fullfilled).catch((err) => console.log(err));
    const sqlStatement = "SELECT TABLE_MATCHES.matchID, TABLE_MATCHES.stageID as STAGE, table_matches.matchdate, (SELECT TABLE_TEAMS.teamName FROM TABLE_TEAMS WHERE TABLE_MATCHES.teamoneID = TABLE_TEAMS.teamID) TEAM1, (SELECT TABLE_TEAMS.teamName from TABLE_TEAMS WHERE TABLE_MATCHES.teamtwoID = TABLE_TEAMS.teamID) TEAM2 FROM TABLE_MATCHES HAVING TABLE_MATCHES.stageID = " +
        currentStage + " AND (team1 is not null and team2 is not null) AND table_matches.matchdate <= '" + today + "'";
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

module.exports = router;