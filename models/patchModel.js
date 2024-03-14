require("dotenv").config();
const DB = require("./dbConnection");

const patchCreate = async (bundle_id, patch_id, remark) => {
  try {
    const sql = "INSERT INTO Patch (bundle_id, patch_id, remark) VALUES(?,?,?)";
    const result = await DB.query(sql, [bundle_id, patch_id, remark]);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

const patchList = async () => {
  try {
    const sql = `SELECT * FROM Patch`;
    const result = await DB.query(sql);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};

const patchUpdate = async (id, patch_id, remark) => {
  try {
    console.log(id, patch_id, remark);
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

const patchByBundle_Id = async (id) => {
  try {
    const sql1 = `SELECT * FROM Patch where bundle_id=?`;
    const result = await DB.query(sql1, [id]);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    throw error;
  }
};
module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
};
