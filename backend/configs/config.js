const Mysql = require("mysql2");
var connection = Mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tm.30164712",
  database: "company_x",
  port: 3306,
});

module.exports = connection;