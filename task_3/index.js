const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fansRoutes = require("./routes/fans-routes");
const newsRoutes = require("./routes/news-routes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use("/news-routes", newsRoutes);
app.use("/fans-routes", fansRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://user:1q2w3e4r@cluster0-5ufn5.mongodb.net/test?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => {
      console.log("Server has been already started");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
