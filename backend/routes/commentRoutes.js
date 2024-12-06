const express = require("express");

const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/blogs/:blogId/comment", commentController.postComment);

router.get("/blogs/:blogId/comments", commentController.getComments);

router.delete("/blogs/comments/:commentId", commentController.DeleteComment);

module.exports = router;
