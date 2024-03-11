require("dotenv").config();
const DB = require("./dbConnection");

const patchCreate = async (data) => {
  try {
    const { bundle_id, patch_id, remark } = data;
    const sql = "INSERT INTO Patch (bundle_id, patch_id, remark) VALUES(?,?,?)";
    const result = await DB.query(sql, [bundle_id, patch_id, remark]);
    return { result };
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

const patchList = async () => {
  try {
    const sql = `SELECT * FROM Patch`;
    const result = await DB.query(sql);
    return { result };
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

const patchUpdate = async (id, data) => {
  try {
    const { patch_id, remark } = data;
    console.log(id);
    const sql = `UPDATE Patch SET patch_id=?, remark=? WHERE id=?`;
    const result = DB.query(sql, [patch_id, remark, id]);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

const patchDelete = async (id) => {
  try {
    const sql = `DELETE FROM Patch Where id=?`;
    const result = DB.query(sql, [id]);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

module.exports = { patchCreate, patchList, patchUpdate, patchDelete };
