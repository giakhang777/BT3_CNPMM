// src/services/CRUDService.ts
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const salt = bcrypt.genSaltSync(10);

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: "0" | "1" | boolean;
  roleId?: string;
}

async function hashUserPassword(password: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

async function createNewUser(data: CreateUserDTO): Promise<string> {
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

function getAllUser(): Promise<any[]> {
  return User.find({}).lean();
}

function getUserInfoById(userId: string): Promise<any | null> {
  return User.findById(userId).lean();
}

async function updateUser(data: {
  id: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}): Promise<any[]> {
  const { id, firstName, lastName, address } = data;
  await User.findByIdAndUpdate(id, { firstName, lastName, address });
  return User.find({}).lean();
}

function deleteUserById(userId: string): Promise<any | null> {
  return User.findByIdAndDelete(userId);
}

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};
