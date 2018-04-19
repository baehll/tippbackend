const express = require("express");
const router = express.Router();

const con = require("../helpers/connector");

//allMatches with teamName for current playStage
router.get("/", (req, res, next) => {
    let sqlStatement = "SELECT table_matches.";
});

module.exports = router;