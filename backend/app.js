const express = require("express");
const cors = require("cors");

const blogRoutes = require("./routes/blogRoutes");
const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use(blogRoutes);

const startApp = async () => {
  try {
    await sequelize.sync();
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
};

startApp();
