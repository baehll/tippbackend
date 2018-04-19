const con = require("./connector");

const today = new Date();
//console.log(today);

let datePromise = new Promise((resolve, reject) => {
    const sqlStatement = "SELECT max(table_matches.matchdate) as date, table_matches.stageID FROM table_matches WHERE table_matches.matchdate <= '2018-06-20'";
    con.connect((err) => {
        con.query(sqlStatement, (err, result) => {
            //console.log(result)
            if (err) reject(err);
            //console.log(result);
            resolve(result[0]);
        });
    });
});

/*
function datePromise() {
    return new Promise(async(resolve, reject) => {
        const sqlStatement = "SELECT max(table_matches.matchdate) as date, table_matches.stageID FROM table_matches WHERE table_matches.matchdate <= '2018-06-20'";
        await con.connect((err) => {
            con.query(sqlStatement, (err, result) => {
                //console.log(result)
                if (err) reject(err);
                //console.log(result);
                resolve(result[0]);
            });
        });
    });
}
*/
//console.log("stage output " + val);
module.exports = () => {
    datePromise.then((fulfilled) => {
        console.log("promise fulfilled? : " + fulfilled.stageID);
    }).catch((error) => {
        console.log(error);
    });
};