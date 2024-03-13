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

// const mysql = require("mysql2/promise");
// const dbConfig = require("../config/dbConfig");

// async function query(sql, params) {
//   try {
//     const connection = await mysql.createConnection(dbConfig);
//     const [results] = await connection.execute(sql, params);
//     return results;
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error;
//   }
// }

// module.exports = {
//   query,
// };


const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

// Create a connection pool using the provided configuration
const pool = mysql.createPool(dbConfig);

// Define a query function that uses the connection pool
async function query(sql, params) {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    // Execute the query using the connection
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  query,
};

