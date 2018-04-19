const con = require("./connector");

module.exports = () => {
    let TABLESTRUCTURE = {
        TABLE_GROUPS: {
            id: {
                colName: "groupID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            name: {
                colName: "groupname",
                specs: "VARCHAR(30) NOT NULL"
            }
        },
        TABLE_STAGES: {
            id: {
                colName: "stageID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            name: {
                colName: "stagename",
                specs: "VARCHAR(30) NOT NULL"
            }
        },
        TABLE_TEAMS: {
            id: {
                colName: "teamID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            name: {
                colName: "teamname",
                specs: "VARCHAR(30) NOT NULL"
            },
            groupID: {
                colName: "groupID",
                specs: "int(6)  NOT NULL"
            }
        },
        TABLE_MATCHES: {
            id: {
                colName: "matchID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            teamone: {
                colName: "teamoneID",
                specs: "int(6) NOT NULL"
            },
            teamtwo: {
                colName: "teamtwoID",
                specs: "int(6) NOT NULL"
            },
            stage: {
                colName: "stageID",
                specs: "int(6) NOT NULL"
            },
            date: {
                colName: "matchdate",
                specs: "DATE NOT NULL"
            }
        },
        TABLE_MATCH_RESULTS: {
            id: {
                colName: "matchResultID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            matchID: {
                colName: "matchID",
                specs: "int(6) NOT NULL"
            },
            goalone: {
                colName: "goalone",
                specs: "int(2) NOT NULL"
            },
            goaltwo: {
                colName: "goaltwo",
                specs: "int(2) NOT NULL"
            }
        },
        TABLE_PLAYERS: {
            id: {
                colName: "playerID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            name: {
                colName: "playername",
                specs: "VARCHAR(255) NOT NULL"
            },
            score: {
                colName: "playerscore",
                specs: "float(6)"
            }
        },
        TABLE_PLAYER_RESULTS: {
            id: {
                colName: "playerResultID",
                specs: "int(6) UNSIGNED  PRIMARY KEY"
            },
            playerID: {
                colName: "playerID",
                specs: "int(6) NOT NULL"
            },
            matchID: {
                colName: "matchID",
                specs: "int(6) NOT NULL"
            },
            tipone: {
                colName: "tipone",
                specs: "int(3) NOT NULL"
            },
            tiptwo: {
                colName: "tiptwo",
                specs: "int(3) NOT NULL"
            }
        }
    };

    let sqlCreateTable = [];
    let sqlFields;

    for (let table in TABLESTRUCTURE) {
        sqlFields = "CREATE TABLE " + table + " ( ";
        let field = TABLESTRUCTURE[table];
        for (let prop in field) {
            sqlFields += field[prop].colName + " " + field[prop].specs + ", ";
        }
        sqlFields = sqlFields.substring(0, sqlFields.length - 2) + ")";
        console.log(sqlFields);
        sqlCreateTable.push(sqlFields);
    }

    sqlCreateTable.forEach((item) => {
        con.connect((err) => {
            con.query(item, (err, result) => {
                if (err) throw err;
                console.log("table erstellt");
            });
        });
    });
}