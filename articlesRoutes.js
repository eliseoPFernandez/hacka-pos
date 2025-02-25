import express from "express";
import ArticleController from "../controllers/articleController.js";

const routes = express.Router();

routes.get("/news", ArticleController.listArticles);
routes.get("/news/:id", ArticleController.listArticleById);
routes.post("/news", ArticleController.submitArticle);
routes.put("/news/:id", ArticleController.updateArticle);
routes.delete("/news/:id", ArticleController.deleteArticle);
export default routes;