const mysql = require("mysql2/promise");
const config = require("../config/dbConfig");

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params); // Ensure params is an array

  return results;
}

module.exports = {
  query,
};
