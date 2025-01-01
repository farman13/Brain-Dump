"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRouter = express_1.default.Router();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(50).email(),
        password: zod_1.z
            .string()
            .min(6)
            .refine((password) => /[A-Z]/.test(password), {
            message: "Required atleast one uppercase character",
        })
            .refine((password) => /[a-z]/.test(password), {
            message: "Required atleast one lowercase character",
        })
            .refine((password) => /[0-9]/.test(password), {
            message: "Required atleast one number",
        })
            .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Required atleast one special character",
        }),
        firstName: zod_1.z.string().min(3).max(30),
        secondName: zod_1.z.string().min(3).max(30),
    });
    const parsedData = reqBody.safeParse(req.body);
    if (!parsedData.success) {
        console.log("Validation errors:", parsedData.error.issues);
        res.json({
            message: "Incorrect format",
            error: parsedData.error.issues[0].message,
        });
        return;
    }
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPass = bcrypt_1.default.hash(password, 10);
        yield db_1.userModel.create({
            username,
            hashedPass
        });
        res.json({
            msg: "SignedUp"
        });
    }
    catch (e) {
        res.send({
            msg: "Error in putting into db"
        });
    }
}));
module.exports({
    userRouter: userRouter
});
