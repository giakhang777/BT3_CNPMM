// src/routes/web.ts
import type { Express } from "express";
const express = require("express");
const homeController = require("../controllers/homeController");

module.exports = (app: Express) => {
  const router = express.Router();

  router.get("/home", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getFindAllCrud);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.get("/", homeController.getHomePage);
  app.use("/", router);
};
