"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUDService = require("../services/CRUDService");
const User = require("../models/user"); // <-- model Mongoose của bạn
async function getHomePage(_req, res) {
    try {
        const data = await User.find({}).lean();
        return res.render("homepage.ejs", { data });
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Server error");
    }
}
function getAboutPage(_req, res) {
    return res.render("about.ejs");
}
function getCRUD(_req, res) {
    return res.render("crud.ejs");
}
async function postCRUD(req, res) {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Post crud to server");
}
async function getFindAllCrud(_req, res) {
    const data = await CRUDService.getAllUser();
    const datalist = data.map((u) => ({ ...u, id: u._id }));
    return res.render("users/findAllUser.ejs", { datalist });
}
async function getEditCRUD(req, res) {
    const userId = req.query.id;
    if (!userId)
        return res.send("không lấy được id");
    const userData = await CRUDService.getUserInfoById(userId);
    if (!userData)
        return res.send("Not find user");
    const data = { ...userData, id: userData._id };
    return res.render("users/editUser.ejs", { data });
}
async function putCRUD(req, res) {
    const data = await CRUDService.updateUser(req.body);
    const datalist = data.map((u) => ({ ...u, id: u._id }));
    return res.render("users/findAllUser.ejs", { datalist });
}
async function deleteCRUD(req, res) {
    const id = req.query.id;
    if (!id)
        return res.send("Not find user");
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
//# sourceMappingURL=homeController.js.map