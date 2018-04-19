const express = require("express");
const app = express();
const fs = require("fs");

const di = require("./server/helpers/dirtyImport");
const dd = require("./server/helpers/dirtyDefaults");

const playerHandler = require("./server/routers/playerRouter");
const matchResultsHandler = require("./server/routers/matchResultsRouter");

//di(); //fügt die tabellen ein
//dd(); //fügt die default werte ein
//Handlers
//players
app.use("/player", playerHandler);
//matches

//matchResults
app.use("/matchResults", matchResultsHandler);

//playerTips

app.listen(3000);
console.log("Running at Port 3000");