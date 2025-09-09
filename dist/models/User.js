"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongoose } = require("../config/mongo");
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    gender: { type: Boolean, default: false },
    image: String,
    roleId: String,
    positionId: String
}, { timestamps: true, collection: "users" });
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
//# sourceMappingURL=User.js.map