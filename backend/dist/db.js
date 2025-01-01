"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
const contentSchema = new mongoose_1.Schema({
    title: String,
    type: String,
    link: String,
    tags: [{ type: mongoose_1.Types.ObjectId, ref: 'Tags' }],
    userId: { type: mongoose_1.Types.ObjectId, ref: 'Users' }
});
const tagSchema = new mongoose_1.Schema({
    title: String
});
const linkSchema = new mongoose_1.Schema({
    hash: String,
    userId: { type: mongoose_1.Types.ObjectId, ref: 'Users' }
});
exports.userModel = (0, mongoose_1.model)("Users", userSchema);
exports.contentModel = (0, mongoose_1.model)("Contents", contentSchema);
exports.tagModel = (0, mongoose_1.model)("Tags", tagSchema);
exports.linkModel = (0, mongoose_1.model)("Links", linkSchema);
