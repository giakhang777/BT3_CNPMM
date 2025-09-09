// src/controllers/homeController.ts
import type { Request, Response } from "express";
const CRUDService = require("../services/CRUDService");
const User = require("../models/user"); // <-- model Mongoose của bạn

async function getHomePage(_req: Request, res: Response) {
  try {
    const data = await User.find({}).lean();
    return res.render("homepage.ejs", { data});
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server error");
  }
}

function getAboutPage(_req: Request, res: Response) {
  return res.render("about.ejs");
}

function getCRUD(_req: Request, res: Response) {
  return res.render("crud.ejs");
}

async function postCRUD(req: Request, res: Response) {
  const message: string = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("Post crud to server");
}

async function getFindAllCrud(_req: Request, res: Response) {
  const data: any[] = await CRUDService.getAllUser();
  const datalist = data.map((u: any) => ({ ...u, id: u._id }));
  return res.render("users/findAllUser.ejs", { datalist });
}

async function getEditCRUD(req: Request, res: Response) {
  const userId = req.query.id as string | undefined;
  if (!userId) return res.send("không lấy được id");

  const userData = await CRUDService.getUserInfoById(userId);
  if (!userData) return res.send("Not find user");

  const data = { ...userData, id: userData._id };
  return res.render("users/editUser.ejs", { data });
}

async function putCRUD(req: Request, res: Response) {
  const data: any[] = await CRUDService.updateUser(req.body);
  const datalist = data.map((u: any) => ({ ...u, id: u._id }));
  return res.render("users/findAllUser.ejs", { datalist });
}

async function deleteCRUD(req: Request, res: Response) {
  const id = req.query.id as string | undefined;
  if (!id) return res.send("Not find user");
  await CRUDService.deleteUserById(id);
  return res.send("Deleted!!!!!!!!!!!!");
}

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
