const con = require("./connector");

function highestPlayerID() {
    let sqlStatement = "SELECT MAX(playerID) FROM TABLE_PLAYERS";
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            con.query((err, result) => {
                if (err) reject(err);
                resolve(result[0].playerID);
            });
        });
    });
}

module.exports = highestPlayerID();