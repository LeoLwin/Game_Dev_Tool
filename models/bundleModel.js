require("dotenv").config();
const deleteFile = require("../middleware/deleteFile");
const DB = require("./dbConnection");
const path = require("path");
const StatusCode = require("../helper/status_code_helper");

const bundleCreate = async (
  name,
  type,
  prod_patch_id,
  orientation,
  index_fileName
) => {
  try {
    const sql =
      "INSERT INTO bundle (name, type, prod_patch_id, orientation ,index_fileName) VALUES(?,?,?,?,?)";
    const result = await DB.query(sql, [
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName,
    ]);
    return new StatusCode.OK("New Bundle is created.");
  } catch (error) {
    return new StatusCode.UNKNOWN(error);
  }
};

const bundleList = async (pages) => {
  try {
    const page = parseInt(pages);
    const PAGE_SIZE = 10; // Number of messages per page
    const offset = (page - 1) * PAGE_SIZE;
    const sql = `SELECT * FROM bundle ORDER BY dev_patch_id DESC LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
    const result = await DB.query(sql);

    // Query to count total number of bundles
    const countSql = "SELECT COUNT(*) AS total FROM bundle";
    const countResult = await DB.query(countSql);
    const total = countResult[0].total;
s
    return new StatusCode.OK(result, total);
  } catch (error) {
    console.error("Error in Bundle Model List:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const bundleUpdate = async (
  id,
  name,
  type,
  prod_patch_id,
  orientation,
  index_fileName
) => {
  try {
    const sql = `UPDATE bundle SET name=?, type=?, prod_patch_id=?, orientation=?, index_fileName=? WHERE dev_patch_id=?`;
    const result = await DB.query(sql, [
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName,
      id,
    ]);
    return new StatusCode.OK("Bundle is updated");
  } catch (error) {
    console.error("Error in Bundle Model Update:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const bundleDelete = async (id) => {
  try {
    console.log(`This is bunndle midel delete ${id}`);
    const sql = `DELETE FROM bundle WHERE dev_patch_id=?`;
    const result = await DB.query(sql, [id]);

    // Check if result is null or not
    if (result === null) {
      return new StatusCode.NOT_FOUND(`${id}`);
    }

    let message = "";
    if (result.affectedRows) {
      message = `Bundle-ID : ${id}  deleted successfully`;
    }
    const idFolderName = `${id}`;
    const filePath = path.join(__dirname, "../uploads", idFolderName);
    await deleteFile(filePath);

    return new StatusCode.OK(message);
  } catch (error) {
    console.error("Error in Bundle Model Delete:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

const bundleDetail = async (id) => {
  try {
    const sql = `SELECT * FROM bundle WHERE dev_patch_id=?`;
    const result = await DB.query(sql, [id]);
    const bundleD = result[0];
    return new StatusCode.OK(bundleD);
  } catch (error) {
    console.error("Error in Bundle Model Detail:", error);
    return new StatusCode.UNKNOWN(error);
  }
};

module.exports = {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
};
