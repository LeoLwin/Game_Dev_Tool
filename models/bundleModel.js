require("dotenv").config();
const DB = require("./dbConnection");
const jwt = require("jsonwebtoken");

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

    return result;
  } catch (error) {
    console.error("Error in Bundle Model Create:", error);
    throw error;
  }
};

const bundleList = async (pages) => {
  try {
    const page = parseInt(pages);
    const PAGE_SIZE = 10; // Number of messages per page
    const offset = (page - 1) * PAGE_SIZE;
    const sql = `SELECT * FROM bundle LIMIT ${PAGE_SIZE} OFFSET ${offset}`;
    const result = await DB.query(sql);
    return result;
  } catch (error) {
    console.error("Error in Bundle Model List:", error);
    throw error;
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
      id
    ]);
    return result;
  } catch (error) {
    console.error("Error in Bundle Model Update:", error);
    throw error;
  }
};

const bundleDelete = async (id) => {
  try {
    const sql = `DELETE FROM bundle WHERE dev_patch_id=?`;
    const result = await DB.query(sql, [id]);
    if (result.affectedRows) {
      message = `Bundle-ID : ${id}  deleted successfully`;
    }
    return message;
  } catch (error) {
    console.error("Error in Bundle Model Delete:", error);
    throw error;
  }
};

const bundleDetail = async (id) => {
  try {
    const sql = `SELECT * FROM bundle WHERE dev_patch_id=?`;
    const result = await DB.query(sql, [id]);
    const bundleD = result[0];
    return bundleD;
  } catch (error) {
    console.error("Error in Bundle Model Detail:", error);
    throw error;
  }
};

module.exports = {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
};
