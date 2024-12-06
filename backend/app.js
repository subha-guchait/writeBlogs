const express = require("express");
const cors = require("cors");

const Blog = require("./models/blog");
const Comment = require("./models/comment");

const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use(blogRoutes);
app.use(commentRoutes);

Comment.belongsTo(Blog, { constraints: true, onDelete: "CASCADE" });
Blog.hasMany(Comment);

const startApp = async () => {
  try {
    await sequelize.sync();
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
};

startApp();
