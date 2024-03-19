require("dotenv").config();
const DB = require("./dbConnection");
const StatusCode = require("../helper/status_code_helper");

const patchCreate = async (bundle_id, patch_id, remark, file_PatchDecode) => {
  try {
    const sql =
      "INSERT INTO Patch (bundle_id, patch_id, remark,file_Patch) VALUES(?,?,?,?)";
    const result = await DB.query(sql, [
      bundle_id,
      patch_id,
      remark,
      file_PatchDecode,
    ]);
    return new StatusCode.OK("New Patch is Created.");
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchList = async (pages) => {
  try {
    const page = parseInt(pages);
    const PAGE_SIZE = 10; // Number of messages per page
    const offset = (page - 1) * PAGE_SIZE;
    const sql = `SELECT * FROM Patch LIMIT ${PAGE_SIZE} OFFSET ${offset}`;

    const result = await DB.query(sql);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchUpdate = async (id, patch_id, remark) => {
  try {
    console.log(id, patch_id, remark);
    const sql = `UPDATE Patch SET patch_id=?, remark=? WHERE id=?`;
    const result = DB.query(sql, [patch_id, remark, id]);
    return new StatusCode.OK(`Patch ID - ${id} is updated!`);
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchDelete = async (id) => {
  try {
    console.log(id);
    const sql = `DELETE FROM Patch Where id=?`;
    const result = DB.query(sql, [id]);
    return new StatusCode.OK(`ID ${id} is deleted.`);
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchByBundle_Id = async (id) => {
  try {
    const sql1 = `SELECT * FROM Patch where bundle_id=?`;
    const result = await DB.query(sql1, [id]);
    return new StatusCode.OK(result);
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const getFile_PathById = async (id) => {
  try {
    // console.log(`Id is ${id}`);
    const sql = `SELECT file_Patch FROM Patch where id=?`;
    const result = await DB.query(sql, [id]);
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
  getFile_PathById,
};
