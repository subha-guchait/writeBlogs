const express = require("express");

const blogController = require("../controllers/blogController");

const router = express.Router();

router.post("/create-blog", blogController.postBlog);

router.get("/blogs", blogController.getBlogs);

router.delete("/blogs/:blogId", blogController.deleteBlog);

module.exports = router;
