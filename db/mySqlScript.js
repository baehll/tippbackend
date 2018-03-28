let mysql   = require("mysql");
let fs = require("fs");

let TABLESTRUCTURE = {
  TABLE_GROUPS:{
    id:{
      colName:"groupsID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    name:{
      colName:"groupname",
      specs:"VARCHAR(30) NOT NULL"
    }
  },
  TABLE_STAGES:{
    id:{
      colName:"stageID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    name:{
      colName:"stagename",
      specs:"VARCHER(30) NOT NULL"
    }
  },
  TABLE_TEAMS:{
    id:{
      colName:"teamID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    name:{
      colName:"teamname",
      specs:"VARCHAR(30) NOT NULL"
    },
    groupID:{
      colName:"groupID",
      specs:"int(6)  NOT NULL"
    }
  },
  TABLE_MATCHES:{
    id:{
      colName:"matchID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    teamone:{
      colName:"teamoneID",
      specs:"int(6) NOT NULL"
    },
    teamtwo:{
      colName:"teamtwoID",
      specs:"int(6) NOT NULL"
    },
    stage:{
      colName:"stageID",
      specs:"int(6) NOT NULL"
    },
    date:{
      colName:"matchdate",
      specs:"DATE NOT NULL"
    }
  },
  TABLE_MATCH_RESULTS:{
    id:{
      colName:"matchResultID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    matchID:{
      colName:"matchID",
      specs:"int(6) NOT NULL"
    },
    goalone:{
      colName:"goalone",
      specs:"int(2) NOT NULL"
    },
    goaltwo:{
      colName:"goaltwo",
      specs:"int(2) NOT NULL"
    }
  },
  TABLE_PLAYERS:{
    id:{
      colName:"playerID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    name:{
      colName:"playername",
      specs:"VARCHAR(255) NOT NULL"
    },
    score:{
      colName:"playerscore",
      specs:"float(6)"
    }
  },
  TABLE_PLAYER_RESULTS:{
    id:{
      colName:"playerResultID",
      specs:"int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY"
    },
    playerID:{
      colName:"playerID",
      specs:"int(6) NOT NULL"
    },
    matchID:{
      colName:"matchID",
      specs:"int(6) NOT NULL"
    },
    tipone:{
      colName:"tipone",
      specs:"int(3) NOT NULL"
    },
    tiptwo:{
      colName:"tiptwo",
      specs:"int(3) NOT NULL"
    }
  }
};

let con = mysql.createConnection({
  host:"localhost",
  port:"4000",
  user:"root",
  password:"root",
  database:"matchdb"
});

con.connect(function(err){
  if (err) console.log(err);
  console.log("DB connected");
});

function createTableSql(){
    let sqlCreateTable = [];
    let sqlFields = "";
    for (let table in TABLESTRUCTURE){
      sqlFields = "CREATE TABLE " + table + " ( ";
      let field = TABLESTRUCTURE[table];
      for (let prop in field){
        sqlFields += field[prop].colName + " " + field[prop].specs + ", ";
      };
      sqlFields = sqlFields.substring(0, sqlFields.length - 2) + ")";
      console.log(sqlFields);
      sqlCreateTable.push(sqlFields);
    };
    return sqlCreateTable;
}

exports.fillDefaultDB = function(){
  let defaultInserts = [];
  //gott hilf mir bitte
  defaultInserts = fs.readFileSync("./DefaultInserts.txt").toString("utf-8").split("/^INSERT INTO * )\",/+g");

  //console.log("defaultInserts ist ein array: " + defaultInserts);
  defaultInserts.forEach(function(item){
    con.connect(function(err){
      con.query(item, function(err, result){
        if(err) return console.log(err);
      });
    });
  });
  console.log("Default Values in der DB");
};

exports.createTables = function(){
  sqlTransaction = createTableSql();

  sqlTransaction.forEach(function(item){
    con.connect(function(err){
      con.query(item, function(err, result){
        if(err) return console.log(err);
        console.log("table erstellt");
      });
    });
  });
}
