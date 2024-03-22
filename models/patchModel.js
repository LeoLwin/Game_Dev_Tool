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
    console.log(result);
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
    const sql = `SELECT * FROM Patch ORDER BY id DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
    const list = await DB.query(sql);

    // Query to count total number of bundles
    const countSql = "SELECT COUNT(*) AS total FROM Patch";
    const countResult = await DB.query(countSql);
    const total = countResult[0].total;

    return new StatusCode.OK({ list, total });
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchUpdate = async (id, patch_id, remark, environment) => {
  try {
    console.log(id, patch_id, remark, environment);
    const sql = `UPDATE Patch SET patch_id=?, remark=?, environment=? WHERE id=?`;
    const result = DB.query(sql, [patch_id, remark, environment, id]);
    return new StatusCode.OK(`Patch ID - ${id} is updated!`);
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchDelete = async (id) => {
  try {
    const sql = `DELETE FROM Patch Where id=?`;
    const result = await DB.query(sql, [id]);
    console.log(`This is result for delete : ${result}`);
    return new StatusCode.OK(`ID ${id} is deleted.`);
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const patchByBundle_Id = async (id) => {
  try {
    const sql1 = `SELECT * FROM Patch WHERE bundle_id = 53 ORDER BY id DESC;`;
    const list = await DB.query(sql1, [id]);

    // Query to count total number of bundles
    const countSql = "SELECT COUNT(*) AS total FROM Patch WHERE bundle_id=?";
    const countResult = await DB.query(countSql, [id]);
    const total = countResult[0].total;
    console.log(total);

    return new StatusCode.OK({ list, total });
  } catch (error) {
    console.error("Error in Patch Model Create:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const getFile_PathById = async (id) => {
  try {
    // console.log(`Id is ${id}`);
    const sql = `SELECT file_Patch FROM Patch WHERE id=?`;
    const result = await DB.query(sql, [id]);
    if (result && result.length === 0) {
      return new StatusCode.NOT_FOUND();
    }

    // Return the result along with OK status code
    return new StatusCode.OK(result);
  } catch (error) {
    console.error("Error in Patch Model getFile_PathById:", error);
    // Return an UNKNOWN status code with the error
    return new StatusCode.UNKNOWN(error);
  }
};

const patchDetail = async (id) => {
  try {
    const sql = `SELECT * FROM Patch WHERE id=?`;
    const result = await DB.query(sql, [id]);
    return new StatusCode.OK(result[0]);
  } catch (error) {
    return new StatusCode.NOT_FOUND(error);
  }
};

const updateEnvironment = async (id) => {
  try {
    const patch = await patchDetail(id);
    const env = patch.data.environment;
    console.log(env);
    switch (env) {
      case "development":
        console.log("This is development");
        const environment = "production";
        const sql = `UPDATE Patch SET environment=? WHERE id=?`;
        const result = await DB.query(sql, [environment, id]);
        return new StatusCode.OK(result);
      case "production":
        console.log("This is production");
        const environment1 = "development";
        const sql1 = `UPDATE Patch SET environment=? WHERE id=?`;
        const result1 = await DB.query(sql1, [environment1, id]);
        return new StatusCode.OK(result1);
      default:
        return new StatusCode.INVALID_ARGUMENT("Unknown environment");
    }
  } catch (error) {
    console.error("Error in Patch Model updateEnvironment:", error);
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
  updateEnvironment,
};
