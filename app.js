const express = require("express");
const app = express();
const fs = require("fs");

const di = require("./server/dirtyImport");

const playerHandler = require("./server/routers/playerRouter");

//di(); //fügt die tabellen ein

//Handlers
//players
app.use("/player", playerHandler);
//matches

//playerTips

app.listen(3000);
console.log("Running at Port 3000");