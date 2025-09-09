"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/CRUDService.ts
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const salt = bcrypt.genSaltSync(10);
async function hashUserPassword(password) {
    return bcrypt.hash(password, salt);
}
async function createNewUser(data) {
    const hashed = await hashUserPassword(data.password);
    await User.create({
        email: data.email,
        password: hashed,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" || data.gender === true,
        roleId: data.roleId,
    });
    return "OK create a new user successfully";
}
function getAllUser() {
    return User.find({}).lean();
}
function getUserInfoById(userId) {
    return User.findById(userId).lean();
}
async function updateUser(data) {
    const { id, firstName, lastName, address } = data;
    await User.findByIdAndUpdate(id, { firstName, lastName, address });
    return User.find({}).lean();
}
function deleteUserById(userId) {
    return User.findByIdAndDelete(userId);
}
module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById,
};
//# sourceMappingURL=CRUDService.js.map