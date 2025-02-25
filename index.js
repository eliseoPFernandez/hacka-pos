import express from "express";

import news from "./articlesRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
("Curso de Node.js"));

    app.use(express.json(), news);
};

export default routes;