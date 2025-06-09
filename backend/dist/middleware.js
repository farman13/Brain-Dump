"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    const header = req.headers['authorization'];
    const decodetoken = jsonwebtoken_1.default.verify(header, process.env.JWT_SECRET || "");
    if (decodetoken) {
        //@ts-ignore
        req.userId = decodetoken.id;
        next();
    }
    else {
        res.status(403).json({
            message: " You are not logged in"
        });
    }
};
exports.Auth = Auth;
