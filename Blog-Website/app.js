import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import articleModel from "./Models/articleModel.js";
import articalRouter from "./routers/article.js";
import methodoverride from "method-override";
dotenv.config();

const connectDb = async (db) => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://tinkushakya501:Prem123456@cluster0.opkdldb.mongodb.net/blog"
    );
    console.log("MongoDb Database Connected");
  } catch (error) {
    console.log("Error while connecting");
  }
};

connectDb();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(methodoverride("_method"));
// view engine configuration

app.set("view engine", "ejs");

// routes
app.get("/", async (req, res) => {
  const articles = await articleModel.find({});
  res.render("article/index", { articles: articles });
});

// public folder for css and js

//app.use(express.static("public"));

app.use("/article", articalRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Seerver listening on port ${port}`);
});
