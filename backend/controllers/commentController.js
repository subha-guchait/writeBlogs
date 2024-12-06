const Comment = require("../models/comment");

exports.postComment = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const comment = req.body.text;

    const data = await Comment.create({
      text: comment,
      blogId: blogId,
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.findAll({
      where: { blogId: blogId },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.DeleteComment = async (req, res, next) => {
  try {
    const cmntId = req.params.commentId;
    const comment = await Comment.findByPk(cmntId);
    await comment.destroy();
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
