const Blog = require("../models/blog");

exports.postBlog = async (req, res, next) => {
  try {
    const blogDetails = req.body;
    if (!blogDetails.title) {
      throw new Error("Title is Mandatory");
    } else if (!blogDetails.author) {
      throw new Error("author is Mandatory");
    } else if (!blogDetails.content) {
      throw new Error("content is Mandatory");
    }

    const data = await Blog.create(blogDetails);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Comment.findByPk(blogId);
    await blog.destroy();
    res.status(200).json({ message: "blog deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
