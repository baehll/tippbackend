const con = require("./connector");

const today = new Date();
console.log(today);

function currentStageDate() {
    let sqlStatement = "SELECT max(table_matches.matchdate) as date, table_matches.stageID FROM table_matches WHERE table_matches.matchdate <= '" + today + "'";
    return new Promise((resolve, reject) => {
        con.connect((err) => {
            con.query(sqlStatement, (err, result) => {
                if (err) reject(err);
                resolve(result[0].stageID);
            });
        });
    });
}

module.exports = async() => {
    //warten, bis das Promise erfüllt wurde
    return await new Promise(async(resolve, reject) => {
        //console.log("reject: " + reject);
        const stage = await currentStageDate()
            .then((response) => {
                //console.log("korrekte response: " + response);
                return response;
            }).catch((fail) => {
                console.log("failed: " + fail);
            });
        // da 0 == false ist, muss auf >= 0 geprüft werden
        if (stage >= 0) resolve(stage);
        reject("kein \"stage\" ist da");
    });
};