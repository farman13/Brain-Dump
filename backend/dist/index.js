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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("hello from server");
});
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(50),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .refine((password) => /[A-Z]/.test(password), {
            message: "Required at least one uppercase character",
        })
            .refine((password) => /[a-z]/.test(password), {
            message: "Required at least one lowercase character",
        })
            .refine((password) => /[0-9]/.test(password), {
            message: "Required at least one number",
        })
            .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "Required at least one special character",
        }),
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
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.userModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            msg: "signed up "
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const existingUser = yield db_1.userModel.findOne({
            username
        });
        //@ts-ignore
        const passwordMatch = bcrypt_1.default.compare(existingUser.password, password);
        if (existingUser && passwordMatch) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET || "");
            res.json({
                token
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            });
        }
    }
    catch (e) {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}));
app.post('/api/v1/content', middleware_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    yield db_1.contentModel.create({
        title,
        type,
        link,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Content added"
    });
}));
app.get('/api/v1/content', middleware_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const userContent = yield db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        userContent
    });
}));
app.delete('/api/v1/content/:contentId', middleware_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    console.log(contentId);
    const Id = new mongoose_1.default.Types.ObjectId(contentId);
    console.log(Id);
    if (!Id) {
        res.status(400).json({ message: "Invalid content ID or user ID" });
        return;
    }
    const result = yield db_1.contentModel.deleteOne({
        _id: Id,
        //@ts-ignore
        userId: req.userId
    });
    if (result.deletedCount === 0) {
        res.status(404).json({ message: "Content not found" });
        return;
    }
    res.json({
        message: "Content deleted"
    });
}));
app.post('/api/v1/brain/share', middleware_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linkModel.findOne({
            //@ts-ignore  
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "share link removed"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    console.log(hash);
    const link = yield db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect link"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found , error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI || "");
    console.log("mongoDB connected");
    app.listen(3000);
});
main();
