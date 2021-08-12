const db = require("../db/connection");

const deleteComment = async (comment_id) => {
  const deletedComment = await db.query(
    `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`,
    [comment_id]
  );
  if (deletedComment.rowCount === 0) {
    return Promise.reject({ status: 404, msg: "comment not found" });
  }
  return deletedComment.rows[0];
};

module.exports = { deleteComment };
