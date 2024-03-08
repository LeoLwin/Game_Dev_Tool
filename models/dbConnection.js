// const mysql = require("mysql2/promise");
// const config = require("../config/dbConfig");

// async function query(sql, params) {
//   const connection = await mysql.createConnection(config);
//   const [results] = await connection.execute(sql, params); // Ensure params is an array

//   return results;
// }

// module.exports = {
//   query,
// };

const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

async function query(sql, params) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

module.exports = {
  query,
};
