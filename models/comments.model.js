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

const updateCommentById = async (inc_votes, comment_id) => {
  const result = await db.query(
    `UPDATE comments 
     SET votes = votes + $1 
     WHERE comment_id = $2 
     RETURNING *;`,
    [inc_votes, comment_id]
  );

  if (result.rowCount === 0) {
    return Promise.reject({ status: 404, msg: "comment not found" });
  }

  return result.rows[0];
};
module.exports = { deleteComment, updateCommentById };
