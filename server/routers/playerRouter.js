const express = require("express");
const router = express.Router();

const con = require("../connector");
//getPlayers
router.get("/", (req, res, next) => {
    let sqlStatement = "SELECT table_players.playerName, table_players.playerScore from table_players order by table_players.playerScore desc";
    con.connect((err) => {
        //if (err) throw err;
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

//getPlayerById
router.get("/:id", (req, res, next) => {
    let sqlStatement = "SELECT table_players.playerName, table_players.playerScore from table_players where table_players.id = " + req.params.id + " order by table_players.playerScore desc";
    con.connect((err) => {
        //if (err) throw err;
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });
});

//addPlayer
router.post("/:name", (req, res, next) => {
    let sqlStatement = "INSERT INTO table_players (table_players.playerName, table_player.playerScore) VALUES (" + req.params.name + ", 0.0)";
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(!err ? 201 : 404);
        });
    });
});

//changePlayerScore
router.put("/:id/:score", (req, res, next) => {
    let sqlStatement = "UPDATE table_players SET table_players.playerScore = " + req.params.score + " where table_players.id = " + req.params.id;
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(!err ? 201 : 404);
        })
    })
})


module.exports = router;