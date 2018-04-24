const express = require("express");
const router = express.Router();

const con = require("../helpers/connector");

router.get("/:playerID", (req, res, next) => {
    let playerID = req.params.playerID;
    let sqlStatement = "SELECT TABLE_PLAYER_RESULTS.playerID, TABLE_PLAYER_RESULTS.tipone + TABLE_PLAYER_RESULTS.tiptwo FROM TABLE_PLAYER_RESULTS WHERE TABLE_PLAYER_RESULTS.playerID = " + playerID;
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

router.get("/:playerID/:matchID", (req, res, next) => {
    let playerID = req.params.playerID;
    let matchID = req.params.matchID;
    let sqlStatement = "SELECT TABLE_PLAYER_RESULTS.playerID, TABLE_PLAYER_RESULTS.matchID, TABLE_PLAYER_RESULTS.tipone + TABLE_PLAYER_RESULTS.tiptwo FROM TABLE_PLAYER_RESULTS WHERE TABLE_PLAYER_RESULTS.playerID = " + playerID +
        " AND TABLE_PLAYER_RESULTS.matchID = " + matchID;
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

router.post("/:playerID/:matchID/:tipOne/:tiptwo", (req, res, next) => {
    let playerID = req.params.playerID;
    let matchID = req.params.matchID;
    let tipOne = req.params.tipOne;
    let tipTwo = req.params.tipTwo;
    let sqlStatement = "INSERT OR REPLACE INTO TABLE_PLAYER_RESULTS (playerID, matchID, tipone, tiptwo) " +
        "VALUES (" + playerID + ", " + matchID + ", " + tipOne + ", " + tipTwo + ") SELECT LAST_INSERT_ID()";
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(201);
            console.log(result);
        });
    });
});

module.exports = router;