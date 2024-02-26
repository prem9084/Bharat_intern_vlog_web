import express from "express";
import articleModel from "../Models/articleModel.js";

const router = express.Router();

router.get("/new", (req, res) => {
  res.render("article/new", { article: new articleModel() });
});

router.get("/update/:id", async (req, res) => {
  const article = await articleModel.findById(req.params.id);
  res.render("article/update", { article: article });
});

// router.get("/:id", async (req, res) => {
//   const article = await articleModel.findById(req.params.id);
//   res.render("article/delete", { article: article });
// });

router.get("/:id", async (req, res) => {
  const article = await articleModel.findById(req.params.id);
  if (article === null) res.redirect("/");
  res.render("article/show", { article: article });
});

router.post("/", async (req, res) => {
  try {
    const { title, discription, markdown } = req.body;
    const article = new articleModel(req.body);
    await article.save();
    res.redirect(`/article/${article.id}`);
  } catch (error) {
    //res.render("article/new", { article: article });
    console.log(`Error in ${error}`);
  }
});

// router.get("/:id", async (req, res) => {
//   await articleModel.findOne(req.params.id);
// });

router.delete("/:id", async (req, res) => {
  await articleModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.put("/update/:id", async (req, res) => {
  try {
    const { title, discription, markdown } = req.body;
    const article = await articleModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      new: true,
    });

    res.redirect(`/article/${article.id}`);
  } catch (error) {
    //res.render("article/new", { article: article });
    console.log(`Error in ${error}`);
  }
});

export default router;
