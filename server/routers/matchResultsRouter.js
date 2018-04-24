const express = require("express");
const router = express.Router();

const con = require("../helpers/connector");

router.get("/:id", (req, res, next) => {
    let matchID = req.params.id;
    let sqlStatement = "SELECT TABLE_MATCH_RESULTS.matchID, TABLE_MATCH_RESULTS.goalone, TABLE_MATCH_RESULTS.goaltwo FROM TABLE_MATCH_RESULTS WHERE TABLE_MATCH_RESULTS.matchID = " + matchID;
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            if (err) throw err;
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })
});

module.exports = router;